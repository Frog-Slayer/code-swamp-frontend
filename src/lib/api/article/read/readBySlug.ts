import { ssrFetch } from "@/lib/api/fetch/ssrFetch"

export const readBySlug = async (username: string, path: string) : Promise<ReadArticleResult> => {
    try {
        const res = await ssrFetch<ReadArticleResult>(
            `/article-query/articles/@${username}/${path}`, 
            {
                method: 'GET', 
            })
            if (!res) throw new Error(`cannot fetch`)
            return res;
    }
    catch (err) {
        throw new Error("cannot fetch")
    }
}
