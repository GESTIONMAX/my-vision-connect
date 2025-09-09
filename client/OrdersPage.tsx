
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Mes commandes</h1>
        <p className="text-muted-foreground mt-2">
          Consultez l'historique de vos commandes
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Commandes récentes</CardTitle>
          <CardDescription>
            Vos commandes des 30 derniers jours
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">
            Fonctionnalité en cours de développement...
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
