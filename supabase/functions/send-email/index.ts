
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
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
    console.log("📦 Request body:", requestBody);
    
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
    
    const { to, subject, formData, emailType = "admin" } = requestData as EmailRequest;

    console.log("📧 Preparing email with data:", { to, subject, formData, emailType });
    
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
        from: "PODA <onboarding@resend.dev>",
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
    console.error("Stack trace:", error.stack);
    return new Response(
      JSON.stringify({ 
        error: true, 
        message: "Chyba při odesílání emailu", 
        details: error.message,
        stack: error.stack
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
