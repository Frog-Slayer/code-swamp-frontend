import { privateFetch } from "../fetch/privateFetch";

interface CheckVersionExistsResponse{ 
    path: string
}

export const checkVersionExists= async (articleId: string, versionId: string) : Promise<CheckVersionExistsResponse>  => {
    try {
        const res = await privateFetch<CheckVersionExistsResponse>(
            `/article-query/articles/${articleId}/versions/${versionId}/status`, 
            {
                method: 'GET', 
            })
        if (!res) throw new Error("cannot check version")
        return res;
    }
    catch (err) {
        throw new Error("cannot check version")
    }
}