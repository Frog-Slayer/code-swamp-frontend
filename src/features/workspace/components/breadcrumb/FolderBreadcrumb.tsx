import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Folder, FolderMap } from "@/features/workspace/types/folder"
import BreadcrumbDropdown from "./BreadCrumbDropdown";
import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { buildPathToRoot } from "@/features/workspace/utils/buildPathToRoot"

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

    const path = buildPathToRoot(currentFolderId, folders)

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