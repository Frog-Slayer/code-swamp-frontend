'use client'

import { useAuth } from "@/features/auth/hooks/useAuth"
import { useUser } from "@/features/user/hooks/useUser"
import { defaultFetch } from "@/lib/customFetch"
import { useEffect, useState } from "react"

export default function SignUp() {
  const { signupToken } = useAuth()
  const { user, setUser } = useUser()

  const [email, setEmail] = useState('')
  const [profileImage, setProfileImage] = useState('')
  const [username, setUsername] = useState('')
  const [nickname, setNickname] = useState('')

  useEffect(() => {
    if (user) {
      setEmail(user.email ?? '')
      setNickname(user.name ?? '')
      setProfileImage(user.profileImage ?? '')
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await defaultFetch('/users/signup', {
      method: 'POST',
      body: {
        token: signupToken,
        email: email,
        username: "username",
        nickname: nickname,
        profileImageUrl: profileImage
      },
    })


    if (res.ok) {
      console.log("login success")
    }
  }

  return (
    <div> 
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} readOnly />
        <input type="text" placeholder="사용자 id" value = {username} onChange={(e) => setUsername(e.target.value)} />
        <input type="text" placeholder="닉네임" value={nickname} onChange={(e) => setNickname(e.target.value)} />

        <button type="submit">
          가입 ㄱ
        </button>
      </form>
    </div>
  )
}