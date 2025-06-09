export type ArticleState = {
    title: string
    slug: string
    summary: string
    thumbnailUrl: string
    isPublic: boolean
    articleId?: string
    versionId?: string
    lastSavedTitle: string
    lastSavedContent: string
    lastSavedTime: number
  }
  
export type ArticleAction =  
    | { type: 'SET_TITLE', title: string }
    | { type: 'SET_SLUG', slug: string}
    | { type: 'SET_SUMMARY', summary: string}
    | { type: 'SET_THUMBNAIL', url: string }
    | { type: 'SET_PUBLIC', isPublic: boolean }
    | { type: 'SAVE', title: string, content: string, articleId: string, versionId: string}
