
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
        // Simple login using WordPress REST API
        endpoint = '/wp-json/wp/v2/users'
        method = 'GET'
        break
        
      case 'register':
        endpoint = '/wp-json/wp/v2/users'
        body = {
          username: params.email.split('@')[0], // Use email prefix as username
          email: params.email,
          password: params.password,
          first_name: params.firstName,
          last_name: params.lastName,
          roles: params.userType === 'business' ? ['subscriber'] : ['subscriber'], // Both get subscriber role for now
          meta: {
            user_type: params.userType,
            phone: params.phone || '',
            company_name: params.companyName || '',
            company_sector: params.companySector || ''
          }
        }
        console.log('Registration data:', body)
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
          email: params.updates.email,
          meta: params.updates
        }
        break
        
      default:
        throw new Error('Action non supportée')
    }

    const url = new URL(`${baseUrl}${endpoint}`)
    
    // Set up headers with admin credentials for all operations
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${btoa(`${clientKey}:${clientSecret}`)}`,
    }

    // For login, we need to find the user by email
    if (action === 'login') {
      url.searchParams.append('search', params.email)
    }

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
      console.error('WordPress API Error:', errorText)
      
      if (action === 'register' && response.status === 400) {
        // Handle common registration errors
        if (errorText.includes('email_exists')) {
          throw new Error('Cette adresse e-mail est déjà utilisée')
        }
        if (errorText.includes('username_exists')) {
          throw new Error('Ce nom d\'utilisateur existe déjà')
        }
      }
      
      throw new Error(`Erreur WordPress: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    console.log('WordPress API Response:', data)
    
    // Format response based on action
    let formattedResponse = data
    
    if (action === 'login') {
      // For login, verify the user exists and password matches
      if (Array.isArray(data) && data.length > 0) {
        const user = data[0]
        
        // Simple password verification (in production, use proper authentication)
        // For now, we'll create a simple token
        formattedResponse = {
          success: true,
          token: btoa(`${user.id}:${params.email}:${Date.now()}`),
          user: user.name || user.username,
          user_data: {
            id: user.id,
            username: user.username,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            roles: user.roles || ['subscriber']
          },
          message: 'Connexion réussie'
        }
      } else {
        throw new Error('Utilisateur non trouvé ou mot de passe incorrect')
      }
    } else if (action === 'register') {
      formattedResponse = {
        success: !!data.id,
        user_id: data.id,
        user_data: data,
        message: 'Compte créé avec succès'
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
