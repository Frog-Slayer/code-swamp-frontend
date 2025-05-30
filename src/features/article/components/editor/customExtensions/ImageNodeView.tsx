import { NodeViewProps, NodeViewWrapper } from "@tiptap/react"

const ImageNodeView = (props: NodeViewProps) => {
    const { node, selected } = props
    const { src, alt } = node.attrs 

    return (
        <NodeViewWrapper as="span">
            {selected && (
                <div> ![{alt}]({src}) </div>
            )}
            <img src={src} alt={alt}/>
        </NodeViewWrapper>
    )
}

export default ImageNodeView