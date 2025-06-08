import { privateFetch } from "@/lib/fetch/privateFetch"

interface PublishRequest{
    title: string
    diff: string,
    isPublic: boolean,
    thumbnailUrl: string | null
    slug: string
    summary: string,
    folderId: string
}

interface PublishUpdateRequest extends PublishRequest{ 
    versionId: string
}

interface PublishResult{
    articleId: string
    versionId: string
}

export const createPublish = async (payload : PublishRequest) : Promise<PublishResult>  => {
    try {
        const res = await privateFetch<PublishResult>(
            "/articles/publish", 
            {
                method: 'POST', 
                body: payload,
            })
        if (!res) throw new Error("cannot create published version")

        return res;
    }
    catch (err) {
        throw new Error("cannot create published version")
    }
}

export const updatePublish = async (payload : PublishUpdateRequest, articleId: string) : Promise<PublishResult>  => {
    try {
        const res = await privateFetch<PublishResult>(
            `/articles/${articleId}/publish`, 
            {
                method: 'POST', 
                body: payload,
            })
        if (!res) throw new Error("cannot publish this version")

        return res;
    }
    catch (err) {
        throw new Error("cannot publish this version")
    }
}