import { privateFetch } from "@/lib/api/fetch/privateFetch"

interface DraftRequest{
    title: string
    folderId: string
    diff : string
}

export interface DraftResult {
    articleId: string
    versionId: string
}

export const createDraft = async (payload : DraftRequest) : Promise<DraftResult>  => {
    try {
        const res = await privateFetch<DraftResult>(
            "/article-command/articles/draft", 
            {
                method: 'POST', 
                body: payload,
            })
        if (!res) throw new Error("cannot create draft")
        return res;
    }
    catch (err) {
        throw new Error("cannot create draft")
    }
}

export const updateDraft = async (payload : DraftRequest, articleId: string, versionId: string) : Promise<DraftResult>  => {
    try {
        const res = await privateFetch<DraftResult>(
            `/article-command/articles/${articleId}/versions/${versionId}/draft`, 
            {
                method: 'PATCH', 
                body: payload
            })
        if (!res) throw new Error("cannot update draft")

        return res;
    }
    catch (err) {
        throw new Error("cannot update article")
    }
}