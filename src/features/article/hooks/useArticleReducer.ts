// hooks/useArticleReducer.ts
import { useReducer } from "react"
import { ArticleState, ArticleAction } from "../types/editor"

const initialState: ArticleState = {
  title: '',
  slug: '',
  summary: '',
  thumbnailUrl: '',
  isPublic: false,
  articleId: undefined,
  versionId: undefined,
  lastSavedContent: '',
  lastSavedTitle: '',
  lastSavedTime: Date.now(),
}

const reducer = (state: ArticleState, action: ArticleAction): ArticleState => {
  switch (action.type) {
    case 'SET_TITLE':
      return { ...state, title: action.title }
    case 'SET_THUMBNAIL':
      return { ...state, thumbnailUrl: action.url }
    case 'SET_PUBLIC':
      return { ...state, isPublic: action.isPublic }
    case 'SET_SLUG':
      return { ...state, slug: action.slug}
    case 'SET_SUMMARY':
      return { ...state, summary: action.summary}
    case 'SAVE':
      return {
        ...state,
        lastSavedTitle: action.title,
        lastSavedContent: action.content,
        lastSavedTime: Date.now(),
        articleId: state.articleId ?? action.articleId,
        versionId: action.versionId,
      }
    default:
      return state
  }
}

export const useArticleReducer = () => useReducer(reducer, initialState)