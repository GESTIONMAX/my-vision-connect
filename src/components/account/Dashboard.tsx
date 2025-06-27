
import React from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  ShoppingBag,
  Heart,
  Clock,
  TrendingUp,
  Package,
  CreditCard,
  Users,
  BarChart3
} from 'lucide-react'
import { Link } from 'react-router-dom'

export function Dashboard() {
  const { profile } = useAuth()

  const isBusinessUser = profile?.user_type === 'business'

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
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

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commandes</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 ce mois-ci
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En attente</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              En cours de traitement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Favoris</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Produits sauvegardés
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {isBusinessUser ? 'Volume total' : 'Total dépensé'}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€2,847</div>
            <p className="text-xs text-muted-foreground">
              {isBusinessUser ? 'Cette année' : 'Toutes commandes'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Business User Special Section */}
      {isBusinessUser && (
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Avantages Professionnels
            </CardTitle>
            <CardDescription>
              Profitez de vos avantages en tant que client professionnel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <CreditCard className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Tarifs préférentiels</p>
                  <p className="text-sm text-muted-foreground">Jusqu'à -15%</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Package className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Livraison prioritaire</p>
                  <p className="text-sm text-muted-foreground">48h ouvrées</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BarChart3 className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Rapports détaillés</p>
                  <p className="text-sm text-muted-foreground">Analytics</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Commandes récentes</CardTitle>
            <CardDescription>Vos dernières commandes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: '#CMD-001', date: '2 Mars 2024', status: 'Livré', amount: '€299.99' },
                { id: '#CMD-002', date: '28 Fév 2024', status: 'En transit', amount: '€159.99' },
                { id: '#CMD-003', date: '25 Fév 2024', status: 'Préparation', amount: '€89.99' },
              ].map((order) => (
                <div key={order.id} className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={
                      order.status === 'Livré' ? 'default' :
                      order.status === 'En transit' ? 'secondary' : 'outline'
                    }>
                      {order.status}
                    </Badge>
                    <p className="text-sm font-medium mt-1">{order.amount}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button asChild className="w-full mt-4" variant="outline">
              <Link to="/account/orders">Voir toutes les commandes</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
            <CardDescription>Accès rapide aux fonctionnalités</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button asChild variant="outline">
                <Link to="/products" className="h-20 flex-col gap-2">
                  <Package className="h-6 w-6" />
                  Parcourir le catalogue
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/account/cart" className="h-20 flex-col gap-2">
                  <ShoppingBag className="h-6 w-6" />
                  Mon panier
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/account/favorites" className="h-20 flex-col gap-2">
                  <Heart className="h-6 w-6" />
                  Mes favoris
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/account/profile" className="h-20 flex-col gap-2">
                  <Users className="h-6 w-6" />
                  Mon profil
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
