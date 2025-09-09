
import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import {
  Package,
  Heart,
  ShoppingBag,
  HeadphonesIcon
} from 'lucide-react'

const features = [
  {
    icon: Package,
    title: 'Parcourir le catalogue',
    description: 'Découvrez notre gamme complète de lunettes connectées',
    link: '/products',
    color: 'text-blue-600'
  },
  {
    icon: Heart,
    title: 'Mes favoris',
    description: 'Sauvegardez vos produits préférés pour plus tard',
    link: '/account/favorites',
    color: 'text-red-500'
  },
  {
    icon: ShoppingBag,
    title: 'Suivi de commandes',
    description: 'Suivez vos commandes en temps réel',
    link: '/account/orders',
    color: 'text-green-600'
  },
  {
    icon: HeadphonesIcon,
    title: 'Support client',
    description: 'Notre équipe est là pour vous aider 24/7',
    link: '/faq',
    color: 'text-purple-600'
  }
]

export function CustomerFeatures() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Que souhaitez-vous faire ?
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Explorez toutes les fonctionnalités disponibles
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto w-12 h-12 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button asChild variant="outline" className="w-full">
                    <Link to={feature.link}>
                      Découvrir
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
