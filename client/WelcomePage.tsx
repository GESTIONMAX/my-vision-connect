
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { WelcomeHero } from './WelcomeHero'
import { CustomerFeatures } from './CustomerFeatures'
import { BusinessFeatures } from './BusinessFeatures'
import { QuickStart } from './QuickStart'
import { OnboardingStep } from './OnboardingStep'
import { Button } from '@/components/ui/button'

export function WelcomePage() {
  const { profile } = useAuth()
  const navigate = useNavigate()
  const isBusinessUser = profile?.user_type === 'business'

  // Auto-redirect after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/account/dashboard')
    }, 5000)
    return () => clearTimeout(timer)
  }, [navigate])

  const handleSkip = () => {
    navigate('/account/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Skip Button */}
        <div className="flex justify-end mb-4">
          <Button onClick={handleSkip} variant="outline">
            Passer →
          </Button>
        </div>

        <div className="space-y-8">
          <WelcomeHero profile={profile} userType={profile?.user_type || 'customer'} />
          <OnboardingStep profile={profile} />
          
          {isBusinessUser ? (
            <BusinessFeatures />
          ) : (
            <CustomerFeatures />
          )}
          
          <QuickStart isBusinessUser={isBusinessUser} />
        </div>
      </div>
    </div>
  )
}
