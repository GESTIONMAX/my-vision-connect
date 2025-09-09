
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'

export function FavoritesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Mes favoris</h1>
        <p className="text-muted-foreground mt-2">
          Retrouvez vos produits préférés
        </p>
      </div>

      <Card>
        <CardContent className="p-8">
          <p className="text-center text-muted-foreground">
            Aucun favori pour le moment. <br />
            Système de favoris en cours de développement...
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
