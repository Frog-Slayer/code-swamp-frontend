import { privateFetch } from "@/lib/api/fetch/privateFetch"

interface PostImageProps {
    image: File
}

interface PostedImageUrl {
    url: string
}

export const postImage = async (payload : PostImageProps) : Promise<PostedImageUrl>  => {
    const { image } = payload
    const validContentTypes = ["image/jpeg",
                                "image/png",
                                "image/gif",
                                "image/webp"]
    const maxSize = 5 * 1024 * 1024

    if (!validContentTypes.includes(image.type)) throw new Error("Unsupported content type error")
    if (image.size > maxSize) throw new Error("Image is too large")

    try {
        const formData = new FormData()
        formData.append("image", image)

        const res = await privateFetch<PostedImageUrl>(
            "/images/upload", 
            {
                method: 'POST', 
                body: formData,
            })

        if (!res) throw new Error()
        return res;
    }
    catch (err) {
        console.log(err)
        throw new Error("failed to upload image")
    }
}

