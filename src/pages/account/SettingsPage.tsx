
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Paramètres</h1>
        <p className="text-muted-foreground mt-2">
          Configurez vos préférences de compte
        </p>
      </div>

      <Card>
        <CardContent className="p-8">
          <p className="text-center text-muted-foreground">
            Page de paramètres en cours de développement...
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
