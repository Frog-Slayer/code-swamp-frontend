'use client'

import { EditorContext, EditorContent } from "@tiptap/react"
import { useCustomEditor } from "../components/editor/useCustomEditor"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"

import PublishModal, { PublishModalProps } from "../components/PublishModal"
import ArticleTitle from "../components/ArticleTitle"

import TableOfContents, { getToc, Heading } from "../components/TableOfContents/TableOfContents"

import { Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

import { useArticleReducer } from "../hooks/useArticleReducer"
import { useArticleActions } from "../hooks/useArticleActions"

import '../components/ArticleContent/editor-styles.scss'
import FolderBreadcrumb from "@/components/folder/BreadCrumb/FolderBreadcrumb"
import { Folder, FolderMap, toFolderMap } from "@/components/folder/types"
import { getMyFolders, getUserFolders } from "@/lib/api/folder/getFolders"
import { renameFolder } from "@/lib/api/folder/renameFolder"
import { createFolder } from "@/lib/api/folder/createFolder"

const ArticleEditPage = () => {
    const autoDraftInterval : number = 10 //sec
    const [state, dispatch] = useArticleReducer()

    const editor = useCustomEditor({onUpdate: ( { editor }) => {
        setToc(getToc(editor))
    }})

    const { setFolder, setTitle, saveDraft, openPublishModal, publishModalProps} = useArticleActions({ state, dispatch, editor })

    const [toc, setToc] = useState<Heading[]>([]);
    const [autoDraftTimer, setAutoDraftTimer] = useState(autoDraftInterval)
    const [folders, setFolders] = useState<FolderMap>({});
    const [rootFolder, setRootFolder] = useState<Folder | undefined>(undefined);

    useEffect(() => {
        const fetchFolders = async () => {
            const folderList = await getMyFolders();
            const folderMap = toFolderMap(folderList.folders);

            setFolders(folderMap);

            const root = Object.values(folderMap).find(folder => folder.parentId === null);

            setRootFolder(root);
            if (!state.folderId) {
                if (root) setFolder(root.id)
            }
        };

        fetchFolders();
    }, []);

    useEffect(() => {
        setAutoDraftTimer(autoDraftInterval)

        const interval = setInterval(() => {
            setAutoDraftTimer(prev => {
                if (prev <= 1) {
                    saveDraft()
                    return autoDraftInterval
                }
                return prev -1
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [state.lastSavedTime, saveDraft])

    const onTitlePressEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()

            const input = e.currentTarget;
            if (!editor) return;

            const cursorPos = input.selectionStart ?? 0;

            const before = state.title.slice(0, cursorPos);
            const after = state.title.slice(cursorPos);

            setTitle(before.trim())

            if (after.trim()) {
                editor.commands.insertContentAt(0, {
                type: 'paragraph',
                content: [{ type: 'text', text: after.trim()}]
                })
            }

            editor.commands.focus('start')
        }
    }

    const handleClickOnBlank = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!editor) return;

        const { state } = editor;
        const pos = editor.view.posAtCoords({ left: e.clientX, top: e.clientY });
        
        if (!pos) {
            const docSize = state.doc.content.size;
            editor.commands.focus();
            editor.commands.setTextSelection(docSize);
        }
    }

    const handleSelectFolder = useCallback((folderId : string) => {
        setFolder(folderId)
    }, [setFolder])

    const handleRenameFolder = useCallback( async (folderId : string, newName: string) => {
        console.log(folders[folderId])
        const res = await renameFolder({ 
            folderId,
            newName
        })

        console.log(res.message)
        console.log(folders[folderId])

        const renamed : Folder = { 
            ...folders[folderId],
            name: newName
        }

        setFolders(prev => ({
            ...prev,
            [renamed.id]: renamed
        }))


    }, [setFolder, folders])

    const handleCreateFolder = useCallback(async (parentId: string, name: string) => {
        const res = await createFolder({ 
            parentId,
            name
        })

        const created : Folder = {
            id: res.folderId,
            parentId: res.parentId,
            name: res.name
        }

        setFolders(prev => ({ 
            ...prev,
            [created.id]: created
        }))

        setFolder(res.folderId)
    }, [setFolder])


    return ( 
        <EditorContext.Provider value={{editor}}>
            <div className="top-0 sticky w-full border-b bg-white px-6 py-4 flex items-center justify-between">
                { state.folderId && ( 
                    <FolderBreadcrumb
                        folders={folders}
                        currentFolderId={state.folderId}
                        onSelectFolder={handleSelectFolder}
                        onRenameFolder={handleRenameFolder}
                        onCreateFolder={handleCreateFolder}
                    />
                )}
                <div className="flex items-center space-x-2">
                    <Button className="cursor-pointer" variant="outline"> 
                        <Clock/> 히스토리 
                    </Button>
                    <Button className="cursor-pointer" variant="outline" onClick={saveDraft}> 초안 저장 </Button>
                    <Button className="cursor-pointer" onClick={openPublishModal}> 발행 </Button>
                    <PublishModal {...publishModalProps} />
                </div>
            </div>
            <div>
                {autoDraftTimer}
            </div>

            <ArticleTitle mode="edit" 
                    value={state.title} 
                    onChange={setTitle} 
                    onEnterPress={onTitlePressEnter} />

            <div className="flex gap-6">
                <div className="flex-1 min-h-screen border p-4 cursor-text" onClick={handleClickOnBlank}>
                <EditorContent
                    editor={editor}
                    role="presentation"
                    placeholder="텍스트 입력"
                />
                </div>
                <aside className="w-64 sticky z-5 top-20 h-[calc(100vh-80px)] overflow-auto border p-4">
                <TableOfContents headings={toc} editor={editor}></TableOfContents>
                </aside>
            </div>
        </EditorContext.Provider>
    )
}

export default ArticleEditPage