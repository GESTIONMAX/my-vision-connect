
import React from 'react'

interface Profile {
  first_name: string | null;
  user_type: 'customer' | 'business' | 'admin' | 'partner';
}

interface WelcomeHeaderProps {
  profile: Profile | null;
  isBusinessUser: boolean;
}

export function WelcomeHeader({ profile, isBusinessUser }: WelcomeHeaderProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold">
        Bonjour {profile?.first_name || 'cher client'} ! 👋
      </h1>
      <p className="text-muted-foreground mt-2">
        {isBusinessUser 
          ? 'Gérez votre compte professionnel et vos commandes'
          : 'Bienvenue dans votre espace personnel'
        }
      </p>
    </div>
  )
}
