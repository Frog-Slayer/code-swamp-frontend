import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from "next/image"
import { ChangeEvent, useRef } from "react"

interface ThumbnailProps {
    src?: string
    onFileChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const Thumbnail = ({ src, onFileChange } : ThumbnailProps) => {
    const defaultImage : string = "https://velog.velcdn.com/images/frog_slayer/post/921e54f6-abfd-4c26-8bb5-1ae1e946b82d/image.svg"
    const inputRef = useRef<HTMLInputElement>(null)

    const imageSrc = src?.trim() ? src : defaultImage

    return (
        <div className="w-[450px] overflow-hidden bg-black rounded-md cursor-pointer">
            <AspectRatio ratio={16 / 9}>
                <img
                    src={imageSrc}
                    alt="Image"
                    className="object-cover w-full h-full"
                />
                <div
                    className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-sm font-semibold"
                    onClick={() => inputRef.current?.click()}
                >
                 썸네일 변경
                </div>
                <input
                    type="file"
                    accept="image/*"
                    ref={inputRef}
                    className="hidden"
                    onChange={onFileChange}
                />
            </AspectRatio>
        </div>

    )
}

export default Thumbnail