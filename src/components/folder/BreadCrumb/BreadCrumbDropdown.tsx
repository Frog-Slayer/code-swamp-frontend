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
        ).sort((a, b) => a.name.localeCompare(b.name, 'ko-KR'))

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
    
    const finishRename = async () => {
        if (renamingFolderId && renameInput.trim()) {
            await onRename(renamingFolderId, renameInput.trim());
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
        <div className="flex flex-col gap-2">
            { siblings.map((folder) => (
                <div 
                    className="flex items-center justify-between rounded hover:bg-gray-200"
                    key={folder.id}
                > 
                    { renamingFolderId === folder.id ? ( 
                        <input
                            className="flex-1 min-w-0 text-sm px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-400"
                            autoFocus
                            value={renameInput}
                            onChange={(e) => setRenameInput(e.target.value)}
                            onBlur={() => setRenamingFolderId(null)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') finishRename()
                                else if (e.key === 'Escape') setRenamingFolderId(null)
                            }}
                        />
                    ) : (
                        <>
                            <span 
                                className="flex-1 text-sm cursor-pointer"
                                onClick={() => onSelect(folder.id)}
                            >
                                {folder.name}
                            </span>
                            {folder.parentId != null && (
                                <button
                                    className="text-sm text-blue-600 hover:underline ml-2 cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setRenamingFolderId(folder.id)
                                    }}
                                >
                                    수정
                                </button>
                            )}
                        </>
                    )}
                </div>
            ))}

            {parentId && (
                <div 
                    className="flex items-center justify-between rounded hover:bg-gray-200"
                > 
 
                    {isAddingNew ? (
                        <>
                            <input
                                className="flex-1 min-w-0 px-2 py-1 border rounded focus:outline-none focus:ring focus:border-green-400"
                                placeholder="New folder name"
                                value={newFolderName}
                                onClick={(e) => {e.stopPropagation(), e.preventDefault()}}
                                onChange={(e) => setNewFolderName(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") finishCreate();
                                    else if (e.key === "Escape") setIsAddingNew(false);
                                }}
                            />
                            <button 
                                className="text-green-600 hover:text-green-800"
                                onClick={finishCreate}
                            > 
                                💾 
                            </button>
                            <button 
                                className="text-red-600 hover:text-red-800"
                                onClick={() => setIsAddingNew(false)}
                            > 
                                ✕ 
                            </button>
                        </>
                        ) : (
                            <div 
                                className="text-blue-500 hover:underline cursor-pointer"
                                onClick={(e) => { 
                                    e.stopPropagation()
                                    e.preventDefault()
                                    setIsAddingNew(true)}} 
                            >
                                + New Folder
                            </div>
                        )}
                </div>
            ) 
        }
        </div>
    )
}

export default BreadcrumbDropdown