import Image from "next/image";
import styles from "./Avatar.module.css"

interface AvatarProps {
    src: string;
    alt: string;
    size?: number;
    onClick?: () => void;
}

const Avatar = ({src, alt, size, onClick }: AvatarProps) => {

    return (
        <div className={styles.wrapper}>
            <Image
                src = {src}
                alt = {alt}
                width = {size}
                height = {size}
                onClick = {onClick}
                unoptimized
            />
        </div>
    )
}

export default Avatar;

