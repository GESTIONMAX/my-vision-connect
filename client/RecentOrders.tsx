
import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function RecentOrders() {
  const orders = [
    { id: '#CMD-001', date: '2 Mars 2024', status: 'Livré', amount: '€299.99' },
    { id: '#CMD-002', date: '28 Fév 2024', status: 'En transit', amount: '€159.99' },
    { id: '#CMD-003', date: '25 Fév 2024', status: 'Préparation', amount: '€89.99' },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Commandes récentes</CardTitle>
        <CardDescription>Vos dernières commandes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
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
  )
}
