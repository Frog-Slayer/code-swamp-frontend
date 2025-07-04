import { defaultFetch } from "@/lib/api/fetch/defaultFetch"
import { privateFetch } from "@/lib/api/fetch/privateFetch"

export interface FolderDto {
    id : string,
    name: string,
    parentId: string | null
}

interface GetUserFoldersRequest {
    userId: string
}

interface GetUserFoldersResponse {
    folders: FolderDto[]
}

export const getUserFolders = async (payload : GetUserFoldersRequest) 
: Promise<GetUserFoldersResponse>  => {
    try {
        const res = await defaultFetch<GetUserFoldersResponse>(
            `/article-query/folders/${payload.userId}`, 
            {
                method: 'GET', 
            })
        if (!res) throw new Error("cannot get folders of user")

        return res;
    }
    catch (err) {
        throw new Error("cannot get folders of user")
    }
}

export const getMyFolders = async () : Promise<GetUserFoldersResponse>  => {
    try {
        const res = await privateFetch<GetUserFoldersResponse>(
            '/article-query/folders', 
            {
                method: 'GET', 
            })
        if (!res) throw new Error("cannot get folders of user")

        return res;
    }
    catch (err) {
        throw new Error("cannot get folders of user")
    }
}