import { IconType } from "react-icons";
import styles from "./PillButton.module.css"

interface PillButtonProps {
    Icon?: IconType;
    label: string;
    onClick: () => void;
};

const PillButton = ({Icon, label, onClick}: PillButtonProps) => {

    return (
        <div className={styles.wrapper}
             onClick={onClick}>
            <div className={styles.icon}>
                {Icon && <Icon />}
            </div>

            <div className={styles.text}>
                {label}
            </div>
        </div>
    );
}

export default PillButton;