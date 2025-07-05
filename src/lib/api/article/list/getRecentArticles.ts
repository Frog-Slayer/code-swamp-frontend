
import { privateFetch } from "@/lib/api/fetch/privateFetch"
import { ArticleListItem } from "./type"
import { ssrFetch } from "../../fetch/ssrFetch"

interface GetRecentArticlesRequest{
    limit : number
    lastArticleId: string | null
    lastCreatedAt: Date| null
}

export const getRecentArticles = async (payload :GetRecentArticlesRequest) : Promise<ArticleListItem[]>  => {
    const {limit, lastArticleId, lastCreatedAt} = payload
    try {
        const queryParams = new URLSearchParams()
        queryParams.set('limit', '20')
        if (lastArticleId !== null) queryParams.set('lastArticleId', lastArticleId.toString())
        if (lastCreatedAt !== null) queryParams.set('lastCreatedAt', lastCreatedAt.toISOString())

        const res = await privateFetch<ArticleListItem[]>(
            `/article-query/articles/recent?${queryParams.toString()}`, 
            {
                method: 'GET', 
            })

        console.log(res)
        if (!res) throw new Error("Cannot fetch recent article list")
        return res;
    }
    catch (err) {
        console.log(err)
        throw new Error("cannot fetch recent articles list")
    }
}