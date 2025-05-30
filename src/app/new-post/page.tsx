'use client'

import { Button } from "@/components/ui/button";
import { DirectorySelector } from "@/features/article/components/editor/DirectorySelector";
import TiptapEditor from "@/features/article/components/editor/TiptapEditor";
import PublishModal, { PublishModalProps } from "@/features/article/components/PublishModal";
import { Clock } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import { Editor } from "@tiptap/react";
import { writeArticle } from "@/lib/api/article/write";
import { postImage } from "@/lib/api/image/postImage";

export default function ArticleWritePage() {
  const [isPublishModalOpen, setPublishModalOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [isPublic, setPublic] = useState(false)
  const [thumbnailUrl, setThumbnailUrl] = useState('')
  const [summary, setSummary] = useState('')
  const [slug, setSlug] = useState('')

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

  const onClickPublish = async () => {
    const content = editorRef.current?.storage.markdown.getMarkdown()

    console.log("title: ", title, "isPublic: ", isPublic, "summary: ", summary, "slug: ", slug, "content: ", content)

    await writeArticle( {
      title,
      isPublic,
      slug,
      content,
      thumbnailUrl,
      summary
    })
  }

  const publishModalProps : PublishModalProps = {
      isOpen: isPublishModalOpen,
      handleClose: () => setPublishModalOpen(false),
      submit: onClickPublish,

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

  return (
    <div className="flex flex-col gap-6 px-6 py-8 max-w-4xl mx-auto">
        <div className="top-0 sticky w-full border-b bg-white px-6 py-4 flex items-center justify-between">
          <DirectorySelector/>

          <div className="flex items-center space-x-2">
            <Button variant="outline"> 
              <Clock/> 히스토리 
            </Button>
            <Button variant="outline"> 저장 </Button>
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
