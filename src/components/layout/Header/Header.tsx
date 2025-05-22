'use client'

import Avatar from "@/components/ui/Avatar/Avatar"
import SearchBar from "../../ui/SearchBar/SearchBar"
import styles from "./Header.module.css"
import NewPostButton from "./NewPostButton"
import Notification from "./Notification"
import LoginButton from "@/features/auth/components/LoginButton"
import LoginModal from "@/features/auth/components/LoginModal"
import { LoginSuccessPayload, NewUserPayload } from "@/features/auth/types/authEvents"

import { useState } from "react"
import { useAuth } from "@/features/auth/hooks/useAuth"
import { useUser } from "@/features/user/hooks/useUser"
import { User } from "@/features/user/types/user"
import { useRouter } from "next/navigation"
import { useRefreshAccessToken } from "@/lib/api/auth/refresh"
import { usePrivateFetch } from "@/lib/customFetch"

const Header = () => {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false)

    const router = useRouter()
    const { accessToken, login, saveSignupToken } = useAuth()
    const { user, setUser } = useUser()
    const privateFetch = usePrivateFetch()

    const isLoggedIn = Boolean(user)

    const onLogoClick = () => {
        router.push('/')
    }

    const onSearch = (query: string) => {
        const test = async () => await privateFetch<string>("/auth/test", {})
        const res = test()
        console.log(res)
    }

    const onLoginSuccess = (payload: LoginSuccessPayload) => {
        login(payload.accessToken)

        const userInfo : User = {
            email: payload.email,
            name: payload.name,
            profileImage: payload.profileImage
        }

        console.log(userInfo)

        setUser( userInfo )
        setLoginModalOpen(false)
    }

    const onNewUser = (payload: NewUserPayload) => {
        saveSignupToken(payload.signupToken)

        const userInfo : User = {
            email: payload.email,
            name: payload.name,
            profileImage: payload.profileImage
        }

        setUser ( userInfo )
        setLoginModalOpen(false)
        router.push('/signup')
    }


    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <div className={styles.logo} onClick={onLogoClick}>MyLogo</div>
            </div>
            

            <div className={styles.center}>
                <SearchBar onSearch={onSearch} placeholder="검색"/>
            </div>
            

            <div className={styles.right}>
                { isLoggedIn && (
                    <>
                        <NewPostButton />
                        <Notification />
                        <Avatar
                            src = { user?.profileImage ?? '-'}
                            alt = "avatar"
                            size = {40}
                            onClick={() => console.log("click avatar")}
                        />
                    </>
                )}

                { !isLoggedIn &&  (
                    <>
                        <LoginButton onClick={() => setLoginModalOpen(true)}/>
                        <LoginModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} onLoginSuccess={onLoginSuccess} onNewUser={onNewUser}/>
                    </>
                )}
            </div>
      </header>
    );
}

export default Header; 
