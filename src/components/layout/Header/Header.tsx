'use client'

import Avatar from "@/components/ui/Avatar/Avatar";
import SearchBar from "../../ui/SearchBar/SearchBar";
import styles from "./Header.module.css"
import NewPostButton from "./NewPostButton";
import Notification from "./Notification";
import LoginButton from "@/components/auth/LoginButton";
import { useState } from "react";
import LoginModal from "@/components/auth/LoginModal";

const Header = () => {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const onSearch = (query: string) => {
        console.log(query);
    };

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
                <LoginModal isOpen={isLoginModalOpen} handleClose={() => setLoginModalOpen(false)} />
            </div>
      </header>
    );
}

export default Header; 
