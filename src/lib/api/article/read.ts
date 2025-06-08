import { privateFetch } from "@/lib/customFetch"

interface ReadArticleResult {
    id: string
    authorId: string
    createdAt: string
    updatedAt: string
    folderId: string,
    summary: string,
    thumbnailUrl: string | null,
    isPublic : string,
    title: string,
    content: string
}

export const readVersionedArticle = async (articleId: string, versionId: string) : Promise<ReadArticleResult>  => {
    try {
        const res = await privateFetch<ReadArticleResult>(
            `/articles/${articleId}/versions/${versionId}`, 
            {
                method: 'GET', 
            })
            if (!res) throw new Error("cannot create draft")
            console.log(res)
            return res;
    }
    catch (err) {
        throw new Error("cannot create draft")
    }
}

