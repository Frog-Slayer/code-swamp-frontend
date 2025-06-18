import { FolderDto } from "@/lib/api/folder/getFolders"

export interface Folder {
    id : string,
    name: string,
    parentId: string | null
}

export type FolderRecord = Record<string, Folder>

export const toFolderMap = (folders: FolderDto[]) : FolderRecord => {
    const map: FolderRecord = {}

    folders.forEach( folder => {
        map[folder.id] = {
            ...folder
        }
    })

    return map
}

