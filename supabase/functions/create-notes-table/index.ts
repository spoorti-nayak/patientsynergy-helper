
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  console.log('Create notes table function called');
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request')
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Creating Supabase admin client');
    // Get the Supabase client
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    )

    console.log('Calling create_patient_notes_table function');
    // Create patient_notes table directly with SQL
    const { data, error: createTableError } = await supabaseAdmin.rpc(
      'create_patient_notes_table'
    )

    if (createTableError) {
      console.error('Error creating table:', createTableError);
      throw createTableError
    }

    console.log('Table created successfully', data);
    return new Response(
      JSON.stringify({ success: true, message: 'Patient notes table created successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error creating table:', error)
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
