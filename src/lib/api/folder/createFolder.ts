import { privateFetch } from "@/lib/fetch/privateFetch"

interface CreateFolderRequest{
    parentId: string
    name: string
}

interface CreateFolderResponse {
    message: string
}

export const createFolder = async (payload : CreateFolderRequest) 
: Promise<CreateFolderResponse>  => {
    try {
        const res = await privateFetch<CreateFolderResponse>(
            '/folders', 
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

