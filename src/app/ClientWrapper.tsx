'use client'

import { attemptAutoLogin } from '@/lib/api/auth/autoLogin'
import { useEffect } from 'react'
import { store } from './store/store'

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const isAuthLoading = store.getState().auth.isAuthLoading

  useEffect(() => {
    attemptAutoLogin()
  }, [])

  if (isAuthLoading) return <></>

  return <>{children}</>
}