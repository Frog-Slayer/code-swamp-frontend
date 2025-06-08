'use client'

import { Button } from "@/components/ui/button";
import { DirectorySelector } from "@/features/article/components/editor/DirectorySelector";
import TiptapEditor from "@/features/article/components/editor/TiptapEditor";
import PublishModal, { PublishModalProps } from "@/features/article/components/PublishModal";
import { Clock } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Editor } from "@tiptap/react";
import { postImage } from "@/lib/api/image/postImage";
import { createDraft, DraftResult, updateDraft } from "@/lib/api/article/draft";
import { createPatch, } from "diff";
import { readVersionedArticle } from "@/lib/api/article/read/readVersionedArticle"
import { createPublish, updatePublish } from "@/lib/api/article/publish";

export default function ArticleWritePage() {
  const [isPublishModalOpen, setPublishModalOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [isPublic, setPublic] = useState(false)
  const [thumbnailUrl, setThumbnailUrl] = useState('')
  const [summary, setSummary] = useState('')
  const [slug, setSlug] = useState('')

  const [lastSavedTitle, setLastSavedTitle] = useState('')
  const [lastSavedContent, setLastSavedContent] = useState('')
  const [lastSavedTime, setLastSavedTime] = useState(Date.now())

  const [articleId, setArticleId] = useState<string| undefined>(undefined)
  const [versionId, setVersionId] = useState<string| undefined>(undefined)

  const autoDraftIntervalMin : number = 1000 * 60 * 10

  const editorRef = useRef<Editor | null >(null)

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const res = await postImage({ image: file})
      setThumbnailUrl(res.url)
      console.log(res.url)
    } catch (err) {
      console.log(err)
    }
  }

  const publish = async () => {
    const content = editorRef.current?.storage.markdown.getMarkdown()
    const diff = createPatch('', lastSavedContent, content, '', '')

    const data = { 
      title,
      diff,
      isPublic,
      thumbnailUrl,
      slug,
      summary,
      folderId: "1",
    }

    if (articleId && versionId) return await updatePublish({ ...data, versionId }, articleId )
    return await createPublish(data)
  }

  const publishModalProps : PublishModalProps = {
      isOpen: isPublishModalOpen,
      handleClose: () => setPublishModalOpen(false),
      submit: publish,

      title,
      summary,
      isPublic,
      thumbnailUrl,
      slug,

      setSummary,
      setPublic,
      handleFileChange,
      setSlug,
  }

  const saveDraftInternal = async(diff: string) : Promise<DraftResult> => {
    if (articleId && versionId) return await updateDraft({ title, folderId: "1", diff }, articleId, versionId )
    return await createDraft({ title, folderId: "1", diff })
  }

  const saveDraft = async () => {
    const content = editorRef.current?.storage.markdown.getMarkdown()
    if (lastSavedContent === content && lastSavedTitle === title) return
    const diff = createPatch('', lastSavedContent, content, '', '')

    const { articleId: resArticleId, versionId: newVersionId } = await saveDraftInternal(diff)

    setLastSavedTitle(title)
    setLastSavedTime(Date.now())
    setLastSavedContent(content)
    if (!articleId) setArticleId(resArticleId)
    setVersionId(newVersionId)
  }

  useEffect(() => {
      const interval = setInterval(() => {
          const now = Date.now()

          if (now - lastSavedTime >= autoDraftIntervalMin) {
            saveDraft()
          }
      }, 60 * 1000)

      return () => clearInterval(interval)
  }, [lastSavedTime])

  const test = async () => {
    if (articleId && versionId)  await readVersionedArticle(articleId, versionId)
  }

  return (
    <div className="flex flex-col gap-6 px-6 py-8 max-w-4xl mx-auto">
        <div className="top-0 sticky w-full border-b bg-white px-6 py-4 flex items-center justify-between">
          <DirectorySelector/>

          <div className="flex items-center space-x-2">
            <Button className="cursor-pointer" variant="outline" onClick={test}> 
              <Clock/> 히스토리 
            </Button>
            <Button className="cursor-pointer" variant="outline" onClick={saveDraft}> 초안 저장 </Button>
            <Button className="cursor-pointer" onClick={() => setPublishModalOpen(true)}> 발행 </Button>
            <PublishModal {...publishModalProps} />
          </div>
        </div>

      <div className="prose dark:prose-invert max-w-none min-h-[300px]">
        <TiptapEditor 
          onInit={(editor) => editorRef.current = editor}
          title={title}
          onTitleChange={setTitle}
          />
      </div>
    </div>
  )
}
