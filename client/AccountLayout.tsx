
import React from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  User,
  ShoppingBag,
  Heart,
  Settings,
  LayoutDashboard,
  ShoppingCart,
  Building2,
  LogOut,
  Crown
} from 'lucide-react'

const navigationItems = [
  {
    href: '/account/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/account/profile',
    label: 'Mon profil',
    icon: User,
  },
  {
    href: '/account/orders',
    label: 'Mes commandes',
    icon: ShoppingBag,
  },
  {
    href: '/account/cart',
    label: 'Mon panier',
    icon: ShoppingCart,
  },
  {
    href: '/account/favorites',
    label: 'Mes favoris',
    icon: Heart,
  },
  {
    href: '/account/settings',
    label: 'Paramètres',
    icon: Settings,
  },
]

export function AccountLayout() {
  const { user, profile, signOut } = useAuth()
  const navigate = useNavigate()

  if (!user || !profile) {
    return null
  }

  const initials = profile.first_name && profile.last_name 
    ? `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase()
    : profile.email?.[0]?.toUpperCase() || 'U'

  const displayName = profile.first_name && profile.last_name
    ? `${profile.first_name} ${profile.last_name}`
    : profile.email

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                {/* User Info */}
                <div className="flex flex-col items-center text-center mb-6">
                  <Avatar className="h-20 w-20 mb-4">
                    <AvatarImage src={profile.avatar_url || ''} alt={displayName || ''} />
                    <AvatarFallback className="text-lg">{initials}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold">{displayName}</h2>
                  <p className="text-sm text-muted-foreground">{profile.email}</p>
                  
                  {/* User Type Badge */}
                  <div className="flex items-center gap-2 mt-3">
                    {profile.user_type === 'business' ? (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Building2 className="h-3 w-3" />
                        Professionnel
                      </Badge>
                    ) : profile.user_type === 'admin' ? (
                      <Badge variant="default" className="flex items-center gap-1">
                        <Crown className="h-3 w-3" />
                        Administrateur
                      </Badge>
                    ) : (
                      <Badge variant="outline">Particulier</Badge>
                    )}
                  </div>

                  {/* Company Info for Business Users */}
                  {profile.user_type === 'business' && profile.company_name && (
                    <div className="mt-2 text-center">
                      <p className="text-sm font-medium text-blue-600">{profile.company_name}</p>
                      {profile.company_sector && (
                        <p className="text-xs text-muted-foreground">{profile.company_sector}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Navigation */}
                <nav className="space-y-2">
                  {navigationItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <NavLink
                        key={item.href}
                        to={item.href}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            isActive
                              ? 'bg-primary text-primary-foreground'
                              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                          }`
                        }
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </NavLink>
                    )
                  })}
                </nav>

                {/* Sign Out Button */}
                <div className="mt-6 pt-6 border-t">
                  <Button
                    onClick={handleSignOut}
                    variant="ghost"
                    className="w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Se déconnecter
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
