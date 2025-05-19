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

const Header = () => {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false)

    const { login } = useAuth()
    const { setUser } = useUser()

    const onSearch = (query: string) => {
        console.log(query)
    }

    const onLoginSuccess = (payload: LoginSuccessPayload) => {
        login(payload.accessToken)

        const userInfo : User = {
            email: payload.email,
            name: payload.name,
            profileImage: payload.profileImage
        }

        setUser( userInfo )
        setLoginModalOpen(false)
    }

    const onNewUser = (payload: NewUserPayload) => {
        console.log("new user")
    }


    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <div className={styles.logo}>MyLogo</div>
            </div>
            

            <div className={styles.center}>
                <SearchBar onSearch={onSearch} placeholder="검색"/>
            </div>
            

            <div className={styles.right}>
                <NewPostButton />
                <Notification />
                <Avatar
                    src = "https://velog.velcdn.com/images/frog_slayer/profile/6610c9f9-84a8-4da2-a1b6-7fbd4bc40818/image.png"
                    alt = "avatar"
                    size = {40}
                    onClick={() => console.log("click avatar")}
                />

                <LoginButton onClick={() => setLoginModalOpen(true)}/>
                <LoginModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} onLoginSuccess={onLoginSuccess} onNewUser={onNewUser}/>
            </div>
      </header>
    );
}

export default Header; 
