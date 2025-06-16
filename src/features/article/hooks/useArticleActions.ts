import { useCallback, useRef, useState } from "react"
import { postImage } from "@/lib/api/image/postImage"
import { createDraft, updateDraft } from "@/lib/api/article/draft"
import { createPatch } from "diff"
import { createPublish, updatePublish } from "@/lib/api/article/publish"
import { PublishModalProps } from "../components/PublishModal"
import { Editor } from "@tiptap/react"
import { ArticleState, ArticleAction } from "../types/editor"

type Props = {
  editor: Editor | null
  state: ArticleState
  dispatch: React.Dispatch<ArticleAction>
}

export const useArticleActions = ({ editor, state, dispatch }: Props) => {
  const [isPublishModalOpen, setPublishModalOpen] = useState(false)

  const setTitle = useCallback((title: string) => {
    dispatch({ type: 'SET_TITLE', title: title})
  }, [dispatch])

  const setFolder = useCallback((folderId: string) => {
    dispatch({ type: 'SET_FOLDER', folderId})
  }, [dispatch])

  const isSavingRef = useRef(false)//=>useEffect doubleRenderring을 막기 위한 lock
  const saveDraft = useCallback(async () => {
    if (!editor) return
    if (isSavingRef.current) return
    isSavingRef.current = true

    try { 
        const content = editor.storage.markdown.getMarkdown()
        if (content === state.lastSavedContent && state.title === state.lastSavedTitle) return

        const diff = createPatch('', state.lastSavedContent, content, '', '')
        console.log(diff)
        console.log(state.folderId)

        const result = state.articleId && state.versionId
        ? await updateDraft({ title: state.title, folderId: state.folderId, diff }, state.articleId, state.versionId)
        : await createDraft({ title: state.title, folderId: state.folderId, diff })

        console.log(result.articleId, result.versionId)

        dispatch({ type: 'SAVE', title: state.title, content, articleId: result.articleId, versionId: result.versionId })
    } finally {
        isSavingRef.current = false
    }
  }, [editor, state, dispatch])

  const publish = useCallback(async () => {
    if (!editor) return
    const content = editor.storage.markdown.getMarkdown()
    const diff = createPatch('', state.lastSavedContent, content, '', '')

    const data = {
      title: state.title,
      diff,
      isPublic: state.isPublic,
      thumbnailUrl: state.thumbnailUrl,
      slug: state.slug,
      summary: state.summary,
      folderId: state.folderId,
    }

    if (state.articleId && state.versionId) await updatePublish({ ...data, versionId: state.versionId }, state.articleId)
    else await createPublish(data)

  }, [editor, state])

  const uploadThumbnail = async (file: File) => {
    const res = await postImage({ image: file })
    dispatch({ type: 'SET_THUMBNAIL', url: res.url })
  }

  const modalProps: PublishModalProps = {
    isOpen: isPublishModalOpen,
    handleClose: () => setPublishModalOpen(false),
    submit: publish,
    title: state.title,
    summary: state.summary,
    isPublic: state.isPublic,
    thumbnailUrl: state.thumbnailUrl,
    slug: state.slug,
    setPublic: (isPublic) => dispatch({ type: 'SET_PUBLIC', isPublic }),
    setSlug: (slug) => dispatch({ type: 'SET_SLUG', slug}),
    setSummary: (summary) => dispatch({ type: 'SET_SUMMARY', summary}),
    handleFileChange: async (e) => {
      const file = e.target.files?.[0]
      if (file) await uploadThumbnail(file)
    },
  }


  return {
    setTitle,
    setFolder,
    saveDraft,
    publish,
    openPublishModal: () => setPublishModalOpen(true),
    closePublishModal: () => setPublishModalOpen(false),
    isPublishModalOpen,
    publishModalProps: modalProps,
  }
}
