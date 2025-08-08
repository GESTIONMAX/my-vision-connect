
import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import {
  Package,
  User,
  Phone,
  Download
} from 'lucide-react'

interface QuickStartProps {
  isBusinessUser: boolean;
}

export function QuickStart({ isBusinessUser }: QuickStartProps) {
  const customerActions = [
    {
      icon: Package,
      label: 'Voir le catalogue',
      link: '/products',
      variant: 'default' as const
    },
    {
      icon: User,
      label: 'Mon profil',
      link: '/account/profile',
      variant: 'outline' as const
    }
  ]

  const businessActions = [
    {
      icon: Phone,
      label: 'Contacter commercial',
      link: '/b2b/support',
      variant: 'default' as const
    },
    {
      icon: Download,
      label: 'Catalogue B2B',
      link: '/b2b/catalog',
      variant: 'outline' as const
    }
  ]

  const actions = isBusinessUser ? businessActions : customerActions

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="text-center space-y-6"
    >
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Prêt à commencer ?
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {isBusinessUser 
            ? "Contactez notre équipe ou explorez notre catalogue professionnel"
            : "Explorez notre catalogue ou complétez votre profil"
          }
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
        {actions.map((action, index) => {
          const Icon = action.icon
          return (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              className="flex-1"
            >
              <Button
                asChild
                variant={action.variant}
                size="lg"
                className={`w-full h-14 ${
                  isBusinessUser && action.variant === 'default'
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : ''
                }`}
              >
                <Link to={action.link} className="flex items-center gap-3">
                  <Icon className="h-5 w-5" />
                  {action.label}
                </Link>
              </Button>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
