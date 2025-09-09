
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Users,
  CreditCard,
  Package,
  BarChart3
} from 'lucide-react'

export function BusinessAdvantages() {
  return (
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
  )
}
