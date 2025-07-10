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
    const baseUrl = 'https://supabasekong-jgsk88o4084w48wk04kk4080.gestionmax.fr/wordpress'
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
    
    // Options pour la requête fetch avec SSL vérifié désactivé
    const fetchOptions = {
      method: 'GET',
      headers,
      // Ignorer la vérification SSL pour les environnements de développement
      //@ts-ignore - L'option suivante est spécifique à Deno
      client: { caCerts: [] }
    }
    
    const response = await fetch(url.toString(), fetchOptions)

    if (!response.ok) {
      throw new Error(`WordPress API Error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('WordPress API request failed:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})