import MarkdownIt from 'markdown-it' 

const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
})

const MarkdownRenderer = ({ markdown } : {markdown : string}) => {
    const html = md.render(markdown)

    return ( 
        <div
            className="tiptap"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    )
}

export default MarkdownRenderer