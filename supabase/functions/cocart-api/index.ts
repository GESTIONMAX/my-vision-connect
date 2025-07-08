import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { endpoint, params, method = 'GET' } = await req.json()
    
    // Get WordPress credentials from environment
    const baseUrl = 'https://wordpress-t0ccgocs0sk0k0g0s4gocwkg.gestionmax.fr'
    
    // Build URL with CoCart endpoint
    const url = new URL(`${baseUrl}/wp-json${endpoint}`)
    
    // Add query parameters for GET requests
    if (method === 'GET' && params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            url.searchParams.append(key, value.join(','))
          } else {
            url.searchParams.append(key, String(value))
          }
        }
      })
    }

    // Set up headers
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    console.log('Making CoCart API request to:', url.toString())

    const requestOptions: RequestInit = {
      method,
      headers,
    }

    // Add body for POST/PUT requests
    if (method !== 'GET' && params) {
      requestOptions.body = JSON.stringify(params)
    }

    const response = await fetch(url.toString(), requestOptions)

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`CoCart API Error: ${response.status} ${response.statusText} - ${errorText}`)
    }

    const data = await response.json()
    
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('CoCart API request failed:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})