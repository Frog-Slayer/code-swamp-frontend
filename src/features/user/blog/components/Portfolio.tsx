import MarkdownRenderer from "@/features/workspace/components/ArticleContent/MarkdownRenderer"
import "@/features/workspace/components/ArticleContent/editor-styles.scss"

const Portfolio = ({portfolio} : {portfolio : string}) => {

    return ( 
        <div className = "tiptap w-full m-4">
            <MarkdownRenderer markdown={portfolio}/>
        </div>
    )
}

export default Portfolio