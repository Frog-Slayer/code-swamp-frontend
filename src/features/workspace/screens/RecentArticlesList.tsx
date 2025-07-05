'use client'

import FeedCard, { FeedCardProps } from "@/components/ui/FeedCard/FeedCard"
import { getRecentArticles } from "@/lib/api/article/list/getRecentArticles"
import { ArticleListItem } from "@/lib/api/article/list/type"
import { useEffect, useState } from "react"

  
const RecentArticlesList = () => {   
    const [list, setList] = useState<ArticleListItem[]>([])

    useEffect(() => {
        const res= async () => {
            const data = await getRecentArticles( {
                limit: 20,
                lastArticleId: null,
                lastCreatedAt: null
            })
            setList(data)
        }
        res()
    }, [])

  const toFeedCard = (item : ArticleListItem) => { 
    const { id, folderPath, slug, authorName, authorNickname, authorProfileImage, updatedAt, thumbnailUrl, title, summary} = item

    const fullPath = `${folderPath}/${slug}`
    const post : FeedCardProps = {
      fullPath,
      thumbnail: thumbnailUrl ?? "",
      title,
      summary,
      publishedAt: updatedAt,
      views: 0,
      likes: 0,
      tags: [],
      author: authorName,
      nickname: authorNickname,
      authorAvatar: authorProfileImage
    }

    return ( 
      <FeedCard key={id} post={post} />
    )
  }

  return ( 
    <>
       {list.map( item => 
        toFeedCard(item)
       )}
    </>
  )
}

export default RecentArticlesList