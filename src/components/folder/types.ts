import { FolderDto } from "@/lib/api/folder/getFolders"

export interface Folder {
    id : string,
    name: string,
    parentId: string | null
}

export type FolderMap = Record<string, Folder>

export const toFolderMap = (folders: FolderDto[]) : FolderMap => {
    const map: FolderMap = {}

    folders.forEach( folder => {
        map[folder.id] = {
            ...folder
        }
    })

    return map
}

