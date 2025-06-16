import { privateFetch } from "@/lib/fetch/privateFetch"

interface RenameFolderRequest{
    folderId: string
    newName: string
}

interface RenameFolderResponse {
    message: string
}


export const renameFolder = async (payload : RenameFolderRequest) 
: Promise<RenameFolderResponse> => {
    const folderId = payload.folderId
    const newName = payload.newName

    try {
        const res = await privateFetch<RenameFolderResponse>(
            `/folders`, 
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
