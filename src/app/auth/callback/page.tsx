'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { AUTH_EVENT_TYPES, LoginSuccessEvent, LoginSuccessPayload, NewUserEvent, NewUserPayload } from '@/features/auth/types/authEvents'

export default function AuthCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const email = searchParams.get('email') ?? ''
    const name = searchParams.get('rame') ?? ''
    const profileImage = searchParams.get('profileImage') ?? ''
    const accessToken = searchParams.get('accessToken') ?? ''

    const newUser = searchParams.get('newUser') === 'true'

    if (window.opener) {
        if (newUser) {
            const newUserPayload : NewUserPayload = {
                email,
                name,
                profileImage
            }

            const newUserEvent: NewUserEvent ={
                type: AUTH_EVENT_TYPES.NEW_USER,
                payload: newUserPayload
            }

            window.opener.postMessage(newUserEvent, window.origin)
        }
        else {
            const loginSuccessPayload : LoginSuccessPayload = {
                accessToken,
                email,
                name,
                profileImage
            }

            const loginSuccessEvent : LoginSuccessEvent = {
                type: AUTH_EVENT_TYPES.LOGIN_SUCCESS,
                payload: loginSuccessPayload
            }

            window.opener.postMessage(loginSuccessEvent, window.origin); 
        }
      window.close()
    } else {
      router.replace('/')
    }
  }, [router, searchParams])

  return (
    <>
    </>
  )
}