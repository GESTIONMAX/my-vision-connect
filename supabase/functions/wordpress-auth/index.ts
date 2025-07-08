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
    const { action, ...params } = await req.json()
    
    // Get WordPress credentials from environment
    const baseUrl = 'https://wordpress-t0ccgocs0sk0k0g0s4gocwkg.gestionmax.fr'
    const clientKey = Deno.env.get('WORDPRESS_CLIENT_KEY')
    const clientSecret = Deno.env.get('WORDPRESS_CLIENT_SECRET')
    
    if (!clientKey || !clientSecret) {
      throw new Error('WordPress API credentials not configured')
    }

    let endpoint = ''
    let method = 'POST'
    let body: any = {}

    switch (action) {
      case 'login':
        endpoint = '/wp-json/jwt-auth/v1/token'
        body = {
          username: params.email,
          password: params.password
        }
        break
        
      case 'register':
        endpoint = '/wp-json/wp/v2/users'
        body = {
          username: params.email,
          email: params.email,
          password: params.password,
          first_name: params.firstName,
          last_name: params.lastName,
          roles: ['customer']
        }
        break
        
      case 'get_current_user':
        endpoint = '/wp-json/wp/v2/users/me'
        method = 'GET'
        break
        
      case 'update_profile':
        endpoint = `/wp-json/wp/v2/users/${params.user_id}`
        method = 'PUT'
        body = {
          first_name: params.updates.first_name,
          last_name: params.updates.last_name,
          email: params.updates.email
        }
        break
        
      default:
        throw new Error('Action non supportée')
    }

    const url = new URL(`${baseUrl}${endpoint}`)
    
    // Set up headers
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    // Add authentication
    const credentials = btoa(`${clientKey}:${clientSecret}`)
    headers['Authorization'] = `Basic ${credentials}`

    console.log('Making WordPress Auth request to:', url.toString())

    const requestOptions: RequestInit = {
      method,
      headers,
    }

    if (method !== 'GET') {
      requestOptions.body = JSON.stringify(body)
    }

    const response = await fetch(url.toString(), requestOptions)

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`WordPress Auth Error: ${response.status} ${response.statusText} - ${errorText}`)
    }

    const data = await response.json()
    
    // Format response based on action
    let formattedResponse = data
    
    if (action === 'login') {
      formattedResponse = {
        success: !!data.token,
        token: data.token,
        user: data.user_nicename,
        message: data.message
      }
    } else if (action === 'register') {
      formattedResponse = {
        success: !!data.id,
        user_id: data.id,
        message: data.message || 'Utilisateur créé avec succès'
      }
    }
    
    return new Response(JSON.stringify(formattedResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('WordPress Auth request failed:', error)
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})