'use client'

import SearchBar from "../../ui/SearchBar/SearchBar"
import styles from "./Header.module.css"
import NewPostButton from "./NewPostButton"
import Notification from "./Notification"
import LoginButton from "@/features/auth/components/LoginButton"
import LoginModal from "@/features/auth/components/LoginModal"
import { LoginSuccessPayload, NewUserPayload } from "@/features/auth/types/authEvents"

import { useState } from "react"
import { User } from "@/features/user/types/user"
import { useRouter } from "next/navigation"
import { logout } from "@/lib/api/auth/logout"
import { RootState, store } from "@/app/store/store"
import { setUser } from "@/features/user/store/userSlice"
import { setAccessTokenAction, setSignupTokenAction } from "@/features/auth/store/authSlice"
import { useSelector } from "react-redux"
import AvatarDropdownMenu from "./AvatarDropdownMenu"

const Header = () => {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false)

    const router = useRouter()
    const user = useSelector((state: RootState) => state.user.user)

    const isLoggedIn = Boolean(user)

    const onLogoClick = () => {
        router.push('/')
    }

    const onSearch = async (query: string) => {
    }

    const onLoginSuccess = (payload: LoginSuccessPayload) => {
        store.dispatch(setAccessTokenAction(payload.accessToken))

        const userInfo : User = {
            email: payload.email,
            name: payload.name,
            profileImage: payload.profileImage
        }

        store.dispatch(setUser( userInfo ))
        setLoginModalOpen(false)
    }

    const onNewUser = (payload: NewUserPayload) => {
        store.dispatch(setSignupTokenAction(payload.signupToken))

        const userInfo : User = {
            email: payload.email,
            name: payload.name,
            profileImage: payload.profileImage
        }

        store.dispatch(setUser( userInfo ))
        setLoginModalOpen(false)
        router.push('/signup')
    }

    const onClickAvatar = () => {


    }

    const onClickSettings = () => {

    }

    const onClickLogout = async () => {
        await logout()
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
                        <AvatarDropdownMenu
                            onClickAvatar={onClickAvatar}
                            onClickSettings={onClickSettings}
                            onClickLogout={onClickLogout}
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
