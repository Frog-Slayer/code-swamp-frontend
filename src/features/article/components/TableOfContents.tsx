import { Editor } from "@tiptap/react"

export interface Heading {
    text: string,
    level: number,
    pos: number
}

export const getToc = (editor: Editor | null) : Heading[] =>  {
    if (!editor) return []

    const headings: Heading[] = []
    editor.state.doc.descendants((node, pos) => {
        if (node.type.name === 'heading') {
            headings.push({
                text: node.textContent,
                level: node.attrs.level,
                pos
            })
        }
    })
    return headings
}

interface TableOfContentsInterface {
    headings: Heading[]
    editor?: Editor | null
}

export const TableOfContents= ({ headings, editor } : TableOfContentsInterface) => {
    const handleClick = (pos: number) => {
        editor?.chain().focus().setTextSelection(pos - 1).run();
    };

    return (
        <div className="space-y-1 text-sm">
        {headings.map((h, i) => (
            <div
                key={i}
                onClick={() => handleClick(h.pos)}
                className="cursor-pointer"
                style={{ marginLeft: `${(h.level - 1) * 20}px` }} 
            >
            {h.text}
            </div>
        ))}
        </div>
    );
};

export default TableOfContents
