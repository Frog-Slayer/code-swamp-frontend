import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Folder, FolderMap } from "../types";
import { useEffect, useState } from "react";

interface BreadcrumbDropdownProps { 
    currentFolderId : string
    folders: FolderMap
    onSelect: (folderId: string) => void
    onRename: (folderId: string, newName: string) => void
    onCreate: (parentId: string, name: string) => void
}

const BreadcrumbDropdown = ({
    currentFolderId,
    folders,
    onSelect,
    onRename,
    onCreate
} : BreadcrumbDropdownProps) => {
    const currentFolder = folders[currentFolderId]
    const parentId = currentFolder?.parentId ?? null

    const siblings= Object.values(folders).filter( 
            f => f.parentId === parentId
        )

    const [renamingFolderId, setRenamingFolderId] = useState<string | null> (null)
    const [renameInput, setRenameInput] = useState("")

    const [isAddingNew, setIsAddingNew] = useState(false)
    const [newFolderName, setNewFolderName] = useState("")

    useEffect(() => {
        if (renamingFolderId) {
          const folder = folders[renamingFolderId];
          setRenameInput(folder?.name ?? "");
        } else {
          setRenameInput("");
        }
      }, [renamingFolderId, folders]);
    
    const finishRename = () => {
        if (renamingFolderId && renameInput.trim()) {
            onRename(renamingFolderId, renameInput.trim());
            setRenamingFolderId(null);
        }
    };

    const finishCreate = () => {
        if (newFolderName.trim() && parentId != null) {
            onCreate(parentId, newFolderName.trim());
            setNewFolderName("");
            setIsAddingNew(false);
        }
    };

    return (
        <>
            { siblings.map((folder) => {
                <div key={folder.id}> 
                    { renamingFolderId === folder.id ? ( 
                        <input
                            autoFocus
                            value={renameInput}
                            onChange={(e) => setRenameInput(e.target.value)}
                            onBlur={finishRename}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') finishRename()
                                else if (e.key === 'Escape') setRenamingFolderId(null)
                            }}
                        />
                    ) : 
                        <>
                            <DropdownMenuItem onClick={() => onSelect(folder.id)}>
                                {folder.name}
                            </DropdownMenuItem>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    if (folder.parentId != null) setRenameInput(folder.id)
                                }}
                            >
                                (Rename)
                            </button>
                        </>
                    }
                </div>
            })}

            <div/>

            {isAddingNew ? (
            <div>
                <input
                    autoFocus
                    placeholder="New folder name"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") finishCreate();
                        else if (e.key === "Escape") setIsAddingNew(false);
                    }}
                />
                <button onClick={finishCreate} > 💾 </button>
                <button onClick={() => setIsAddingNew(false)}> ✕ </button>
            </div>
            ) : (
            <DropdownMenuItem
                className="text-green-600 cursor-pointer"
                onClick={() => setIsAddingNew(true)}
            >
                ➕ New Folder
            </DropdownMenuItem>
            )}
        </>
    )
}

export default BreadcrumbDropdown