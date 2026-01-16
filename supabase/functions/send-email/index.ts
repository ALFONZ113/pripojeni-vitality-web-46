
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";
import { EmailRequest } from "./types.ts";
import { corsHeaders } from "./utils/cors.ts";
import { generateCustomerEmailHTML } from "./templates/customer-email.ts";
import { generateAdminEmailHTML } from "./templates/admin-email.ts";

// Initialize Resend with API key
const resendApiKey = Deno.env.get("RESEND_API_KEY");
console.log("RESEND_API_KEY exists:", !!resendApiKey);
const resend = new Resend(resendApiKey);

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Input validation schema
const FormDataSchema = z.object({
  name: z.string().trim().min(1, "Jméno je povinné").max(100, "Jméno je příliš dlouhé"),
  email: z.string().trim().email("Neplatný email").max(255, "Email je příliš dlouhý"),
  phone: z.string().trim().min(9, "Telefon musí mít alespoň 9 znaků").max(20, "Telefon je příliš dlouhý"),
  address: z.string().trim().max(200, "Adresa je příliš dlouhá").optional().nullable(),
  city: z.string().trim().max(100, "Město je příliš dlouhé").optional().nullable(),
  zip: z.string().trim().max(10, "PSČ je příliš dlouhé").optional().nullable(),
  propertyType: z.string().trim().max(50, "Typ nemovitosti je příliš dlouhý").optional().nullable(),
  currentProvider: z.string().trim().max(100, "Poskytovatel je příliš dlouhý").optional().nullable(),
  currentPrice: z.string().trim().max(50, "Cena je příliš dlouhá").optional().nullable(),
  message: z.string().trim().max(2000, "Zpráva je příliš dlouhá").optional().nullable()
});

const EmailRequestSchema = z.object({
  to: z.string().trim().email("Neplatný cílový email").max(255),
  subject: z.string().trim().min(1, "Předmět je povinný").max(200, "Předmět je příliš dlouhý"),
  formData: FormDataSchema,
  emailType: z.enum(["admin", "customer"]).optional().default("admin")
});

serve(async (req) => {
  console.log("🔄 Request received for send-email function");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log("👍 Handling OPTIONS preflight request");
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Log request headers
    console.log("📝 Request headers:", Object.fromEntries(req.headers.entries()));
    
    // Parse request body and log it
    const requestBody = await req.text();
    console.log("📦 Request body received (length):", requestBody.length);
    
    let requestData;
    try {
      requestData = JSON.parse(requestBody);
    } catch (parseError) {
      console.error("❌ Error parsing JSON:", parseError);
      return new Response(
        JSON.stringify({ 
          error: true, 
          message: "Invalid JSON in request body" 
        }), 
        { 
          status: 400, 
          headers: { 
            ...corsHeaders, 
            "Content-Type": "application/json" 
          } 
        }
      );
    }

    // Validate input data
    const validationResult = EmailRequestSchema.safeParse(requestData);
    if (!validationResult.success) {
      console.error("❌ Validation error:", validationResult.error.issues);
      return new Response(
        JSON.stringify({ 
          error: true, 
          message: "Neplatná data formuláře",
          details: validationResult.error.issues.map(i => i.message)
        }), 
        { 
          status: 400, 
          headers: { 
            ...corsHeaders, 
            "Content-Type": "application/json" 
          } 
        }
      );
    }

    const { to, subject, formData, emailType } = validationResult.data;

    console.log("📧 Preparing email with validated data:", { to, subject, emailType });
    
    // Save form data to database ONLY for admin emails (to avoid duplicates)
    if (emailType === "admin") {
      try {
        console.log("💾 Saving form data to database");
        const { data: submissionData, error: dbError } = await supabase
          .from('form_submissions')
          .insert([{
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address || null,
            city: formData.city || null,
            zip: formData.zip || null,
            property_type: formData.propertyType || null,
            current_provider: formData.currentProvider || null,
            current_price: formData.currentPrice || null,
            message: formData.message || null,
            status: 'new'
          }])
          .select();

        if (dbError) {
          console.error("❌ Database error:", dbError);
          // Continue with email sending even if DB fails
        } else {
          console.log("✅ Form data saved to database:", submissionData);
        }
      } catch (dbError) {
        console.error("❌ Error saving to database:", dbError);
        // Continue with email sending even if DB fails
      }
    } else {
      console.log("📧 Skipping database save for customer email (already saved with admin email)");
    }
    
    let htmlContent: string;
    let replyTo: string | undefined;

    if (emailType === "customer") {
      // Customer email with beautiful design matching the website
      htmlContent = generateCustomerEmailHTML(formData);
      replyTo = "terc@obchod.poda.cz";
    } else {
      // Admin email (original logic)
      htmlContent = generateAdminEmailHTML(formData);
      replyTo = formData.email;
    }

    console.log("📨 Sending email with Resend API");
    console.log("📧 To:", to);
    console.log("📝 Subject:", subject);
    console.log("🔑 RESEND_API_KEY present:", !!resendApiKey);
    console.log("📮 Email type:", emailType);
    
    try {
      const emailResponse = await resend.emails.send({
        from: "PODA <info@popri.cz>",
        to: [to],
        subject: subject,
        html: htmlContent,
        reply_to: "junkert@seznam.cz"
      });

      console.log("✅ Email sent successfully:", emailResponse);

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: `${emailType === "customer" ? "Customer" : "Admin"} email úspěšně odeslán`,
          response: emailResponse
        }), 
        { 
          status: 200, 
          headers: { 
            ...corsHeaders, 
            "Content-Type": "application/json" 
          } 
        }
      );
    } catch (emailError: any) {
      console.error("❌ Resend API error:", emailError);
      throw new Error(`Email sending failed: ${emailError.message}`);
    }

  } catch (error: any) {
    console.error("❌ Email sending error:", error);
    return new Response(
      JSON.stringify({ 
        error: true, 
        message: "Chyba při odesílání emailu", 
        details: error.message
      }), 
      { 
        status: 500, 
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json" 
        } 
      }
    );
  }
});
