
import React from 'react'
import { useAuth } from '@/hooks/useAuth'
import { WelcomeHeader } from './WelcomeHeader'
import { StatsCards } from './StatsCards'
import { BusinessAdvantages } from './BusinessAdvantages'
import { RecentOrders } from './RecentOrders'
import { QuickActions } from './QuickActions'

export function Dashboard() {
  const { profile } = useAuth()
  const isBusinessUser = profile?.user_type === 'business'

  return (
    <div className="space-y-6">
      <WelcomeHeader profile={profile} isBusinessUser={isBusinessUser} />
      <StatsCards isBusinessUser={isBusinessUser} />
      {isBusinessUser && <BusinessAdvantages />}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentOrders />
        <QuickActions />
      </div>
    </div>
  )
}
