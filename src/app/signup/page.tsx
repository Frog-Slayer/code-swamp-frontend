'use client'

import { useAuth } from "@/features/auth/hooks/useAuth"
import { useUser } from "@/features/user/hooks/useUser"
import { signUp } from "@/lib/api/user/signup"
import { useEffect, useState } from "react"
import SignUpForm from "./SignupForm"
import { SignupRequest } from "@/lib/api/user/type"

export default function SignUp() {
  const { signupToken } = useAuth()
  const { user } = useUser()

  const onSubmit = async (data: SignupRequest) => {
    try {
      if (!signupToken) throw new Error('Signup token is required')

      await signUp({
        token: data.token,
        email: data.email,
        username: data.username,
        nickname: data.nickname,
        profileImageUrl: data.profileImageUrl
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div> 
      { signupToken && user ? (
      <SignUpForm
        defaultValues={{ token: signupToken, email: user.email, nickname: user.name, profileImageUrl: user.profileImage}}
        onSubmit={ onSubmit }
      />) : (
        <p> 로그인이 필요합니다 </p>
        )
      }
    </div>
  )
}