import { privateFetch } from "@/lib/customFetch"

interface ArticleWriteRequest{
    title: string
    content: string
    isPublic: boolean
    thumbnailUrl: string | null
    slug: string
    summary: string
}

export const writeArticle = async (payload :ArticleWriteRequest) : Promise<void>  => {
    try {
        const res = await privateFetch<void>(
            "/articles", 
            {
                method: 'POST', 
                body: payload,
            })

        return res;
    }
    catch (err) {
        console.log(err)
        throw new Error("cannot write article")
    }
}
