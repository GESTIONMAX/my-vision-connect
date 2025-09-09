
import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import {
  User,
  Camera,
  Package,
  CheckCircle
} from 'lucide-react'
import { Profile } from '@/types/auth';

interface OnboardingStepProps {
  profile: Profile | null;
}

export function OnboardingStep({ profile }: OnboardingStepProps) {
  const suggestions = []

  // Check if profile is incomplete
  const isProfileIncomplete = !profile?.first_name || !profile?.last_name || !profile?.phone
  if (isProfileIncomplete) {
    suggestions.push({
      icon: User,
      title: 'Complétez votre profil',
      description: 'Ajoutez vos informations personnelles',
      link: '/account/profile',
      priority: 'high'
    })
  }

  // Check if avatar is missing
  if (!profile?.avatar_url) {
    suggestions.push({
      icon: Camera,
      title: 'Ajoutez une photo',
      description: 'Personnalisez votre compte avec une photo de profil',
      link: '/account/profile',
      priority: 'medium'
    })
  }

  // Always suggest exploring catalog for new users
  suggestions.push({
    icon: Package,
    title: 'Explorez le catalogue',
    description: 'Découvrez notre gamme de produits',
    link: '/products',
    priority: 'low'
  })

  if (suggestions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              Profil complet !
            </h3>
            <p className="text-green-700">
              Votre compte est entièrement configuré. Profitez de votre expérience EUROGLOBAL !
            </p>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      className="space-y-4"
    >
      <div className="text-center">
        <Badge variant="outline" className="mb-2">
          Étape 1/3 : Bienvenue
        </Badge>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Optimisez votre expérience
        </h3>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {suggestions.slice(0, 2).map((suggestion, index) => {
              const Icon = suggestion.icon
              const isPriority = suggestion.priority === 'high'
              
              return (
                <motion.div
                  key={suggestion.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    isPriority 
                      ? 'border-orange-200 bg-orange-50' 
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isPriority 
                        ? 'bg-orange-100 text-orange-600' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{suggestion.title}</h4>
                      <p className="text-sm text-gray-600">{suggestion.description}</p>
                    </div>
                  </div>
                  <Button 
                    asChild 
                    size="sm" 
                    variant={isPriority ? 'default' : 'outline'}
                  >
                    <Link to={suggestion.link}>
                      {isPriority ? 'Compléter' : 'Voir'}
                    </Link>
                  </Button>
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
