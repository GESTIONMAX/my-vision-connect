
import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Link } from 'react-router-dom'
import {
  Package,
  ShoppingBag,
  HeadphonesIcon,
  BarChart3,
  Users
} from 'lucide-react'

const features = [
  {
    icon: Package,
    title: 'Tarifs préférentiels',
    description: 'Bénéficiez de remises exclusives sur vos commandes en volume',
    badge: 'Exclusif',
    link: '/b2b/catalog'
  },
  {
    icon: ShoppingBag,
    title: 'Commandes en volume',
    description: 'Passez des commandes importantes avec facilité',
    badge: 'B2B',
    link: '/account/orders'
  },
  {
    icon: HeadphonesIcon,
    title: 'Support dédié',
    description: 'Accès à un conseiller commercial personnel',
    badge: 'Premium',
    link: '/b2b/support'
  },
  {
    icon: BarChart3,
    title: 'Rapports de vente',
    description: 'Analysez vos achats et optimisez votre budget',
    badge: 'Analytics',
    link: '/account/dashboard'
  },
  {
    icon: Users,
    title: 'Gestion équipe',
    description: 'Gérez les accès et permissions de votre équipe',
    badge: 'Team',
    link: '/account/settings'
  }
]

export function BusinessFeatures() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Vos avantages professionnels
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Profitez de tous les services dédiés aux entreprises
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group border-blue-100 hover:border-blue-200">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="mx-auto w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg text-blue-900 dark:text-blue-100">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                    <Link to={feature.link}>
                      Accéder
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
