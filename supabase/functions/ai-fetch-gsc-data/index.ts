import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface GSCRow {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface GSCResponse {
  rows?: GSCRow[];
}

// Function to get OAuth2 access token using service account
async function getAccessToken(): Promise<string> {
  const serviceAccountJson = Deno.env.get('GOOGLE_SERVICE_ACCOUNT_JSON');
  
  if (!serviceAccountJson) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON not found in environment');
  }

  const serviceAccount = JSON.parse(serviceAccountJson);
  
  // Create JWT for Google OAuth2
  const header = {
    alg: 'RS256',
    typ: 'JWT',
  };

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: serviceAccount.client_email,
    scope: 'https://www.googleapis.com/auth/webmasters.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };

  // Import private key
  const privateKey = await crypto.subtle.importKey(
    'pkcs8',
    new TextEncoder().encode(serviceAccount.private_key),
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: 'SHA-256',
    },
    false,
    ['sign']
  );

  // Sign JWT
  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(payload));
  const signatureInput = `${encodedHeader}.${encodedPayload}`;
  
  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    privateKey,
    new TextEncoder().encode(signatureInput)
  );

  const encodedSignature = btoa(String.fromCharCode(...new Uint8Array(signature)));
  const jwt = `${signatureInput}.${encodedSignature}`;

  // Exchange JWT for access token
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  if (!tokenResponse.ok) {
    const error = await tokenResponse.text();
    console.error('Token exchange failed:', error);
    throw new Error(`Failed to get access token: ${tokenResponse.status}`);
  }

  const tokenData = await tokenResponse.json();
  return tokenData.access_token;
}

// Function to fetch GSC data
async function fetchGSCData(accessToken: string, siteUrl: string, startDate: string, endDate: string) {
  const url = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`;
  
  const requestBody = {
    startDate,
    endDate,
    dimensions: ['query', 'page'],
    rowLimit: 1000,
  };

  console.log('Fetching GSC data for:', { siteUrl, startDate, endDate });

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('GSC API error:', error);
    throw new Error(`GSC API request failed: ${response.status}`);
  }

  return await response.json() as GSCResponse;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting GSC data fetch...');

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get access token
    console.log('Getting OAuth2 access token...');
    const accessToken = await getAccessToken();
    console.log('Access token obtained successfully');

    // Define site URL and date range
    const siteUrl = 'sc-domain:popri.online'; // Using domain property
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7); // Last 7 days

    const startDateStr = startDate.toISOString().split('T')[0];
    const endDateStr = endDate.toISOString().split('T')[0];

    // Fetch GSC data
    console.log('Fetching GSC data...');
    const gscData = await fetchGSCData(accessToken, siteUrl, startDateStr, endDateStr);

    if (!gscData.rows || gscData.rows.length === 0) {
      console.log('No data returned from GSC');
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'No data available for the specified period',
          inserted: 0
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Received ${gscData.rows.length} rows from GSC`);

    // Prepare data for insertion
    const trackingData = gscData.rows.map((row) => ({
      keyword: row.keys[0], // query
      url: row.keys[1], // page
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
      position: Math.round(row.position),
      tracked_date: endDateStr,
      location: 'cz',
      device: 'desktop',
    }));

    // Insert data into seo_tracking table
    console.log(`Inserting ${trackingData.length} records into database...`);
    const { data, error } = await supabase
      .from('seo_tracking')
      .upsert(trackingData, {
        onConflict: 'keyword,url,tracked_date',
        ignoreDuplicates: false,
      });

    if (error) {
      console.error('Database insert error:', error);
      throw error;
    }

    console.log('Data inserted successfully');

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'GSC data fetched and stored successfully',
        inserted: trackingData.length,
        dateRange: { start: startDateStr, end: endDateStr }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in ai-fetch-gsc-data:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
