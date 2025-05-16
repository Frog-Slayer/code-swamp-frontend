'use client'

import SearchBar from "../ui/SearchBar/SearchBar";
import headerStyles from "./Header.module.css"

const Header = () => {
    const onSearch = (query: string) => {
        console.log(query);
    };

    return (
        <header className={headerStyles.header}>
            <div className={headerStyles.logo}>MyLogo</div>
            
            <SearchBar onSearch={onSearch} placeholder="검색"/>
            
            <button className={headerStyles.newArticleButton}>새 글 추가</button>
            
            <button className={headerStyles.notification} aria-label="알림">
            🔔
            </button>
            
            <img
                src="/avatar.jpg"
                alt="사용자 아바타"
                className={headerStyles.avatar}
            />
      </header>
    );
}

export default Header; 
