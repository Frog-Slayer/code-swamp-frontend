import { privateFetch } from "@/lib/api/fetch/privateFetch"

interface CreateFolderRequest{
    parentId: string
    name: string
}

interface CreateFolderResponse {
    folderId: string,
    parentId: string,
    name: string
}

export const createFolder = async (payload : CreateFolderRequest) 
: Promise<CreateFolderResponse>  => {
    try {
        console.log(`parentId: ${payload.parentId}`)
        const res = await privateFetch<CreateFolderResponse>(
            '/article-command/folders', 
            {
                method: 'POST', 
                body: payload
            })
        if (!res) throw new Error("cannot create folder")

        return res;
    }
    catch (err) {
        throw new Error("cannot create folder")
    }
}

