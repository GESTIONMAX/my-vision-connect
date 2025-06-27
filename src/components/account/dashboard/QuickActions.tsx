
import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Package,
  ShoppingBag,
  Heart,
  Users
} from 'lucide-react'

export function QuickActions() {
  return (
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
  )
}
