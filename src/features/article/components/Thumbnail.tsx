import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from "next/image"

interface ThumbnailProps {
    src?: string
}

const Thumbnail = ({ src } : ThumbnailProps) => {
    const defaultImage : string = "https://velog.velcdn.com/images/frog_slayer/post/921e54f6-abfd-4c26-8bb5-1ae1e946b82d/image.svg"

    return (
        <div className="w-[450px] overflow-hidden bg-black rounded-md">
            <AspectRatio ratio={16 / 9}>
                <img
                src={src ?? defaultImage}
                alt="Image"
                className="object-cover w-full h-full"
                />
            </AspectRatio>
        </div>

    )
}

export default Thumbnail