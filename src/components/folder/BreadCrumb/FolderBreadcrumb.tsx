import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Folder, FolderMap } from "@/components/folder/types"
import BreadcrumbDropdown from "./BreadCrumbDropdown";
import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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

    const [isAddingNew, setIsAddingNew] = useState(false)
    const [newFolderName, setNewFolderName] = useState("")

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
                {path.map((folder) => {
                    return ( 
                        <div key={folder.id} className="flex">
                            <BreadcrumbItem> 
                                <Popover>
                                    <PopoverTrigger className="cursor-pointer">
                                        {folder.name}
                                    </PopoverTrigger>
                                    <PopoverContent align="start">
                                        <BreadcrumbDropdown
                                            parentId={folder.parentId}
                                            folders={folders}
                                            onSelect={onSelectFolder}
                                            onRename={onRenameFolder}
                                            onCreate={onCreateFolder}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator/>
                        </div>
                    )
                })}
            
                <BreadcrumbItem> 
                    <Popover>
                        <PopoverTrigger className="cursor-pointer">
                            ...
                        </PopoverTrigger>
                        <PopoverContent align="start">
                            <BreadcrumbDropdown
                                parentId={currentFolderId}
                                folders={folders}
                                onSelect={onSelectFolder}
                                onRename={onRenameFolder}
                                onCreate={onCreateFolder}
                            />
                        </PopoverContent>
                    </Popover>
                </BreadcrumbItem>
            </BreadcrumbList>    

        </Breadcrumb>
    )
}

export default React.memo(FolderBreadcrumb)