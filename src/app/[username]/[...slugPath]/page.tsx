import ArticleTitleView from "@/features/workspace/components/ArticleTitle/ArticleTitleView"
import { DirectorySelector } from "@/features/workspace/components/DirectorySelector"
import MarkdownRenderer from "@/features/workspace/components/ArticleContent/MarkdownRenderer"
import { readBySlug } from "@/lib/api/article/read/readBySlug"
import { TableOfContents } from "lucide-react"

interface ReadPageProps { 
    params: { 
        username: string
        slugPath: string[]
    }
}

const ReadPage = async ({ params } : ReadPageProps) => {
    console.log("reach here")
    const { username, slugPath } = await params
    const path = slugPath.join('/')

    const res = await readBySlug(username, path)

    return ( 
    <div className="flex flex-col gap-6 px-6 py-8 max-w-4xl mx-auto">
        <div className="top-0 sticky w-full border-b bg-white px-6 py-4 flex items-center justify-between">
          <DirectorySelector/>
        </div>

      <div className="prose dark:prose-invert max-w-none min-h-[300px]">
        <ArticleTitleView title={res.title}/>
        <div> authorId: {res.authorId} createdAt: {res.createdAt} updatedAt: {res.updatedAt} </div>
        <div className="flex gap-6">
            <div className="flex-1 min-h-screen border p-4 cursor-text">
                <MarkdownRenderer markdown={ res.content} />
            </div>
        <aside className="w-64 sticky z-5 top-20 h-[calc(100vh-80px)] overflow-auto border p-4">
          <TableOfContents ></TableOfContents>
        </aside>
      </div>

      </div>
    </div>
    )
}

export default ReadPage