import { IconType } from "react-icons";
import styles from "./SocialLoginButton.module.css"

interface SocialLoginButtonProps{
    Icon?: IconType;
    label: string;
    onClick: () => void;
}

const SocialLoginButton = ({Icon, label, onClick}: SocialLoginButtonProps) => {
    return (
        <div className={styles.wrapper} onClick={onClick}>
            {Icon && <Icon />}
            {label}
        </div>
    )
}

export default SocialLoginButton;