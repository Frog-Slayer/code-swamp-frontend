import { Folder, FolderMap } from "../types";
import { useEffect, useState } from "react";

interface BreadcrumbDropdownProps { 
    parentId: string | null
    folders: FolderMap
    onSelect: (folderId: string) => void
    onRename: (folderId: string, newName: string) => void
    onCreate: (parentId: string, name: string) => void
}

const BreadcrumbDropdown = ({
    parentId,
    folders,
    onSelect,
    onRename,
    onCreate
} : BreadcrumbDropdownProps) => {
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
            { siblings.map((folder) => (
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
                            <span onClick={() => onSelect(folder.id)}>
                                {folder.name}
                            </span>
                            {folder.parentId != null && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        if (folder.parentId != null) setRenameInput(folder.name)
                                    }}
                                >
                                    (Rename)
                                </button>
                            )}
                        </>
                    }
                </div>
            ))}

            {isAddingNew ? (
            <div>
                <input
                    placeholder="New folder name"
                    value={newFolderName}
                    onClick={(e) => {e.stopPropagation(), e.preventDefault()}}
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
                <div onClick={(e) => { 
                    e.stopPropagation()
                    e.preventDefault()
                    setIsAddingNew(true)}} >
                    + New Folder
                </div>
            )}
        </>
    )
}

export default BreadcrumbDropdown