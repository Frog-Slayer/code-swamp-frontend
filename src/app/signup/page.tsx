'use client'

import { signUp } from "@/lib/api/user/signup"
import SignUpForm from "./SignupForm"
import { SignupRequest } from "@/lib/api/user/signup"
import { RootState, store } from "../store/store"
import { useSelector } from "react-redux"
import { temporaryLogin } from "@/lib/api/auth/temporaryLogin"
import { setUser } from "@/features/user/store/userSlice"
import { setAccessTokenAction } from "@/features/auth/store/authSlice"
import { useRouter } from "next/navigation"

export default function SignUp() {
  const signupToken = useSelector((state: RootState) => state.auth.signupToken)
  const user = useSelector((state: RootState) => state.user.user)
  const router = useRouter()

  const onSubmit = async (data: SignupRequest) => {
    try {
      if (!signupToken) throw new Error('Signup token is required')

      const res = await signUp({
        token: data.token,
        email: data.email,
        username: data.username,
        nickname: data.nickname,
        profileImageUrl: data.profileImageUrl
      })

      const authResult = await temporaryLogin({
        token: res.otp,
        email: data.email
      })
      
      store.dispatch(setAccessTokenAction(authResult.accessToken))
      store.dispatch(setUser({
        name: authResult.userProfile.nickname,
        profileImage: authResult.userProfile.profileImage
      }))

    } catch (error) {
      console.log(error)
    }
    finally {
      router.push("/")
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