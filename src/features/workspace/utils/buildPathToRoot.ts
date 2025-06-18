import { Folder, FolderRecord } from "../types/folder"

export const buildPathToRoot = (currentFolderId: string, folders: FolderRecord) : Folder[] =>  {
    const path: Folder[] = []

    let currentId: string | null = currentFolderId

    while (currentId) { 
        const folder : Folder = folders[currentId]
        if (!folder) break
        path.push(folder)
        currentId = folder.parentId
    }

    return path.reverse()
}
