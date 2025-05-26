`use client`

import { useEffect, useRef } from "react"
import { EditorView } from "codemirror"
import { EditorState } from "@codemirror/state"
import { NodeViewWrapper } from "@tiptap/react"
import { javascript } from '@codemirror/lang-javascript'
import { cpp } from '@codemirror/lang-cpp'
import { java } from '@codemirror/lang-java'
import { defaultKeymap, historyKeymap, indentWithTab } from '@codemirror/commands'
import { autocompletion, closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete'
import { bracketMatching,  } from '@codemirror/language' 
import { keymap, lineNumbers } from '@codemirror/view'

const customKeymap = [
    ...defaultKeymap,
    ...closeBracketsKeymap,
    ...historyKeymap,
    indentWithTab
  ];
    
export const CustomCodeBlock = ({node, updateAttributes} : any) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const viewRef = useRef<EditorView | null>(null)
  
    useEffect(() => {
      if (!containerRef.current) return
  
      const state = EditorState.create({
        doc: node.textContent,
        extensions: [
          java(),
          autocompletion(),
          closeBrackets(),
          bracketMatching(),
          lineNumbers(),
          EditorView.lineWrapping,
          keymap.of(customKeymap),
          EditorView.updateListener.of(update => {
            if (update.docChanged) {
              const value = update.state.doc.toString()
              if (value !== node.textContent) {
                console.log(value)
                updateAttributes({ text: value })
              }
            }
          }),
        ],
      })
      const view =  new EditorView({
        state,
        parent: containerRef.current,
      })

      viewRef.current = view
      viewRef.current.focus()

    return () => {
        view.destroy()
    }
    }, [node.textContent, updateAttributes])
  
    return (
      <NodeViewWrapper className="code-block" style={{ border: '1px solid #ccc', borderRadius: 6, padding: 12 }}>
        <div ref={containerRef} contentEditable={false} />
      </NodeViewWrapper>
    )
}