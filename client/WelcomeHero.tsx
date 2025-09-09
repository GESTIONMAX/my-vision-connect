
import React from 'react'
import { motion } from 'framer-motion'

interface Profile {
  first_name: string | null;
  last_name: string | null;
  user_type: 'customer' | 'business' | 'admin' | 'partner';
  company_name?: string | null;
}

interface WelcomeHeroProps {
  profile: Profile | null;
  userType: string;
}

export function WelcomeHero({ profile, userType }: WelcomeHeroProps) {
  const isBusinessUser = userType === 'business'
  const displayName = profile?.first_name || 'cher client'
  const companyName = profile?.company_name

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center space-y-4"
    >
      <div className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          Bienvenue {displayName} ! 🎉
        </h1>
        {companyName && (
          <p className="text-xl text-blue-600 font-medium">
            {companyName}
          </p>
        )}
      </div>
      
      <div className="max-w-2xl mx-auto">
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {isBusinessUser 
            ? "Gérez votre catalogue professionnel et bénéficiez de nos tarifs préférentiels entreprise"
            : "Découvrez nos lunettes connectées dernière génération et trouvez le produit parfait pour vous"
          }
        </p>
      </div>

      <div className="flex justify-center">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`w-16 h-16 rounded-full flex items-center justify-center ${
            isBusinessUser 
              ? 'bg-blue-600 text-white' 
              : 'bg-gradient-to-br from-blue-600 to-purple-600 text-white'
          }`}
        >
          <span className="text-2xl font-bold">EG</span>
        </motion.div>
      </div>
    </motion.div>
  )
}
