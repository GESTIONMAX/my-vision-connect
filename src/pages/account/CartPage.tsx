
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'

export function CartPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Mon panier</h1>
        <p className="text-muted-foreground mt-2">
          Gérez les produits de votre panier
        </p>
      </div>

      <Card>
        <CardContent className="p-8">
          <p className="text-center text-muted-foreground">
            Votre panier est vide. <br />
            Système de panier en cours de développement...
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
