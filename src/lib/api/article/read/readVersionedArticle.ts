import { privateFetch } from "@/lib/api/fetch/privateFetch"

export const readVersionedArticle = async (articleId: string, versionId: string) : Promise<ReadArticleResult>  => {
    try {
        const res = await privateFetch<ReadArticleResult>(
            `/articles/${articleId}/versions/${versionId}`, 
            {
                method: 'GET', 
            })
            if (!res) throw new Error(`cannot fetch article with ${articleId} with version ${versionId}`)
            console.log(res)
            return res;
    }
    catch (err) {
        throw new Error(`cannot fetch article with ${articleId} with version ${versionId}`)
    }
}