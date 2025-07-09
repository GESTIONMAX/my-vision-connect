
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
    const username = Deno.env.get('WORDPRESS_CLIENT_KEY') // WordPress username
    const appPassword = Deno.env.get('WORDPRESS_CLIENT_SECRET') // Application password
    
    if (!username || !appPassword) {
      throw new Error('WordPress credentials not configured. Please set username and application password.')
    }

    let endpoint = ''
    let method = 'POST'
    let body: any = {}

    switch (action) {
      case 'login':
        // For login, we need to find the user first by email to get their username
        endpoint = '/wp-json/wp/v2/users'
        method = 'GET'
        break
        
      case 'register':
        endpoint = '/wp-json/wp/v2/users'
        const username = params.email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '') + Math.random().toString(36).substring(7)
        body = {
          username: username, // Generate unique username
          email: params.email,
          password: params.password,
          first_name: params.firstName,
          last_name: params.lastName,
          roles: params.userType === 'business' ? ['subscriber'] : ['subscriber'],
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
    
    // Set up headers
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    // Always use admin credentials for all operations
    headers['Authorization'] = `Basic ${btoa(`${username}:${appPassword}`)}`

    // For login, we need to search by email to find the user
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
      // Search returned users by email
      if (Array.isArray(data) && data.length > 0) {
        const user = data[0]
        
        // Now verify the password by trying to authenticate with the user's actual username
        try {
          const loginUrl = new URL(`${baseUrl}/wp-json/wp/v2/users/me`)
          const loginHeaders = {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${btoa(`${user.username}:${params.password}`)}`
          }
          
          const loginResponse = await fetch(loginUrl.toString(), {
            method: 'GET',
            headers: loginHeaders
          })
          
          if (loginResponse.ok) {
            const userData = await loginResponse.json()
            formattedResponse = {
              success: true,
              token: btoa(`${userData.id}:${params.email}:${Date.now()}`),
              user: userData.name || userData.username,
              user_data: {
                id: userData.id,
                username: userData.username,
                email: userData.email,
                first_name: userData.first_name,
                last_name: userData.last_name,
                roles: userData.roles || ['subscriber']
              },
              message: 'Connexion réussie'
            }
          } else {
            throw new Error('Mot de passe incorrect')
          }
        } catch (authError) {
          throw new Error('Identifiants incorrects')
        }
      } else {
        throw new Error('Utilisateur non trouvé')
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
