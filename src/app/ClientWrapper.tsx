'use client'

import { useAuth } from '@/features/auth/hooks/useAuth'
import { useAutoLogin } from '@/lib/api/auth/autoLogin'
import { useEffect } from 'react'

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const attemptAutoLogin = useAutoLogin()
  const { isAuthLoading } = useAuth() 

  useEffect(() => {
    attemptAutoLogin()
  }, [])

  if (isAuthLoading) return <></>

  return <>{children}</>
}