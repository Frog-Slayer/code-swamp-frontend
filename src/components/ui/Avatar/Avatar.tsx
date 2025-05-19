import Image from "next/image";

interface AvatarProps {
    src: string;
    alt: string;
    size?: number;
    onClick?: () => void;
}

const Avatar = ({src, alt, size, onClick }: AvatarProps) => {

    return (
        <Image
            src = {src}
            alt = {alt}
            width = {size}
            height = {size}
            onClick = {onClick}
            style={{borderRadius: '50%', cursor: 'pointer'}}
            unoptimized
        />
    )
}

export default Avatar;

