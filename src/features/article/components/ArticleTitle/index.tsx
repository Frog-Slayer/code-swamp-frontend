import dynamic from "next/dynamic"
import ArticleTitleView from "./ArticleTitleView"

const ArticleTitleEditor = dynamic(() => import("./ArticleTitleEditor"), { ssr: false })

interface ArticleTitleProps {
    mode: "edit" | "view"
    value: string
    onChange?: (val: string) => void
    onEnterPress?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
    className? : string
}

const baseStyle = "text-3xl font-bold outline-none w-full max-w-2xl resize-none overflow-hidden"

const ArticleTitle = ({ mode, value, onChange, onEnterPress, className }: ArticleTitleProps) => {
    const style = className ?? baseStyle

    if (mode === "edit") {
      return (
        <ArticleTitleEditor
          value={value}
          onChange={onChange!}
          onEnterPress={onEnterPress}
          className={style}
        />
      )
    }
  
    return <ArticleTitleView title={value} className={style} />
  }
  
  export default ArticleTitle