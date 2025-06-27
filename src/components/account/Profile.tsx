
import React, { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Loader2, Camera, Building2 } from 'lucide-react'

export function Profile() {
  const { profile, updateProfile } = useAuth()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    first_name: profile?.first_name || '',
    last_name: profile?.last_name || '',
    phone: profile?.phone || '',
    company_name: profile?.company_name || '',
    company_sector: profile?.company_sector || '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    const { error } = await updateProfile(formData)

    if (error) {
      setError('Erreur lors de la mise à jour du profil')
    } else {
      setSuccess('Profil mis à jour avec succès')
    }

    setLoading(false)
  }

  if (!profile) return null

  const initials = profile.first_name && profile.last_name 
    ? `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase()
    : profile.email?.[0]?.toUpperCase() || 'U'

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Mon profil</h1>
        <p className="text-muted-foreground mt-2">
          Gérez vos informations personnelles et professionnelles
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Photo de profil</CardTitle>
            <CardDescription>
              Votre photo d'identification
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <Avatar className="h-32 w-32">
              <AvatarImage src={profile.avatar_url || ''} />
              <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">
              <Camera className="h-4 w-4 mr-2" />
              Changer la photo
            </Button>
            
            {/* Account Type */}
            <div className="text-center">
              {profile.user_type === 'business' ? (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Building2 className="h-3 w-3" />
                  Compte Professionnel
                </Badge>
              ) : (
                <Badge variant="outline">Compte Particulier</Badge>
              )}
              
              {profile.pricing_group && (
                <p className="text-xs text-muted-foreground mt-2">
                  Groupe tarifaire: {profile.pricing_group}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Profile Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Informations personnelles</CardTitle>
            <CardDescription>
              Mettez à jour vos informations de contact
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">Prénom</Label>
                  <Input
                    id="first_name"
                    value={formData.first_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Nom</Label>
                  <Input
                    id="last_name"
                    value={formData.last_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email || ''}
                  disabled
                  className="bg-muted"
                />
                <p className="text-xs text-muted-foreground">
                  L'email ne peut pas être modifié
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>

              {/* Business Information */}
              {profile.user_type === 'business' && (
                <div className="space-y-4 p-4 bg-blue-50 rounded-lg border">
                  <h3 className="font-medium text-blue-900">Informations professionnelles</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company_name">Nom de l'entreprise</Label>
                    <Input
                      id="company_name"
                      value={formData.company_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, company_name: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company_sector">Secteur d'activité</Label>
                    <Input
                      id="company_sector"
                      value={formData.company_sector}
                      onChange={(e) => setFormData(prev => ({ ...prev, company_sector: e.target.value }))}
                    />
                  </div>
                </div>
              )}

              {error && (
                <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</p>
              )}

              {success && (
                <p className="text-sm text-green-600 bg-green-50 p-2 rounded">{success}</p>
              )}

              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Mettre à jour le profil
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
