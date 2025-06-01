'use client'

import { attemptAutoLogin } from '@/lib/api/auth/autoLogin'
import { useEffect } from 'react'
import { RootState } from './store/store'
import { useSelector } from 'react-redux'

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const isAuthLoading = useSelector((state: RootState) => state.auth.isAuthLoading)

  useEffect(() => {
    attemptAutoLogin()
  }, [])

  if (isAuthLoading) return <></>

  return <>{children}</>
}