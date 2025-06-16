import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Folder, FolderMap } from "@/components/folder/types"
import BreadcrumbDropdown from "./BreadCrumbDropdown";

interface FolderBreadCurmbProps{ 
    folders: FolderMap,
    currentFolderId : string,
    onSelectFolder: (folderId: string) => void
    onRenameFolder: (folderId: string, newName: string) => void
    onCreateFolder: (parentId: string, name: string) => void
}

const FolderBreadcrumb = ({
    folders, 
    currentFolderId,
    onSelectFolder,
    onRenameFolder,
    onCreateFolder
} : FolderBreadCurmbProps) => {

    const buildPathToRoot = () : Folder[] =>  {
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

    const path = buildPathToRoot()

    return( 
        <Breadcrumb>
            <BreadcrumbList>
            {path.map((folder, index) => {
                return ( 
                    <div key={folder.id}>
                        <BreadcrumbItem> 
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    {folder.name}
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    <BreadcrumbDropdown
                                        currentFolderId={folder.id}
                                        folders={folders}
                                        onSelect={onSelectFolder}
                                        onRename={onRenameFolder}
                                        onCreate={onCreateFolder}
                                    />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </BreadcrumbItem>
                    </div>
                )
            })}
            </BreadcrumbList>    
        </Breadcrumb>
    )
}

export default FolderBreadcrumb