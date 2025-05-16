import headerStyles from "./Header.module.css"

const Header = () => {
    return (
        <header className={headerStyles.header}>
            <div className={headerStyles.logo}>MyLogo</div>
            
            <input
                type="search"
                className={headerStyles.search}
                placeholder="검색어를 입력하세요"
            />
            
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
