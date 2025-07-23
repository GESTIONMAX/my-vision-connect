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
    const { endpoint, params } = await req.json()
    
    // Get WordPress credentials from environment
    const baseUrl = 'http://wordpress-kk4gw0gs40ock4800ccoogkk.91.99.22.54.sslip.io'
    const clientKey = Deno.env.get('WORDPRESS_CLIENT_KEY')
    const clientSecret = Deno.env.get('WORDPRESS_CLIENT_SECRET')
    
    // Build URL with parameters
    const url = new URL(`${baseUrl}/wp-json/wp/v2${endpoint}`)
    
    if (params) {
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

    // Add authentication if credentials are available
    if (clientKey && clientSecret) {
      const credentials = btoa(`${clientKey}:${clientSecret}`)
      headers['Authorization'] = `Basic ${credentials}`
    }

    console.log('Making WordPress API request to:', url.toString())

    console.log('Fetching from URL:', url.toString())
    
    // Options pour la requête fetch
    const fetchOptions = {
      method: 'GET',
      headers
    }
    
    const response = await fetch(url.toString(), fetchOptions)
    
    console.log('WordPress API response status:', response.status)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error(`WordPress API Error (${response.status}): ${errorText.substring(0, 200)}`)
      throw new Error(`WordPress API Error: ${response.status} ${response.statusText}`)
    }
    
    try {
      // Récupérer le texte de la réponse
      const responseText = await response.text()
      console.log('WordPress API response preview:', responseText.substring(0, 100) + '...')
      
      // Tenter de parser comme JSON
      const data = JSON.parse(responseText)
      
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    } catch (parseError) {
      console.error('Failed to parse WordPress API response:', parseError)
      return new Response(JSON.stringify({ error: `Failed to parse API response: ${parseError.message}` }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      })
    }
  } catch (error) {
    console.error('WordPress API request failed:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})