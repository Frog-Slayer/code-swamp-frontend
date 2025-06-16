import { IconType } from "react-icons";
import styles from "./SocialLoginButton.module.css"

interface SocialLoginButtonProps{
    Icon?: IconType
    label: string
    provider: 'google' | 'github'
}

const SocialLoginButton = ({Icon, label, provider}: SocialLoginButtonProps) => {
    const handlePopup = (provider: 'google' | 'github') => {
        const width = 600;
        const height = 700;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;
    
        const popup = window.open(
            `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/${provider}`,
            `${provider}Login`,
            `width=${width},height=${height},top=${top},left=${left}`
        );
    }

    return (
        <div className={styles.wrapper} onClick={() => handlePopup(provider)}>
            {Icon && <Icon />}
            {label}
        </div>
    )
}

export default SocialLoginButton;