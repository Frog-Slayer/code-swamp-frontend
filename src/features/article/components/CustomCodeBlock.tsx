import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { Plugin } from '@tiptap/pm/state'
import { TextSelection } from 'prosemirror-state'

export const CustomCodeBlock = CodeBlockLowlight.extend({


  addOptions() {
    return {
      ...this.parent?.(),
      exitOnTripleEnter: false,
      lowlight: {},
      defaultLanguage: 'plaintext'
    }
  },

  addProseMirrorPlugins() {
    return [
      ...this.parent?.() || [],
      new Plugin({
        props: {
          handleKeyDown: (view, event) => {
            const { state } = view
            const { $from, from, to } = state.selection
            const isInCodeBlock = $from.parent.type.name === 'codeBlock'
  
            if (!isInCodeBlock) return false
  
            if (event.key === 'Tab') {
              event.preventDefault()
              view.dispatch(state.tr.insertText('  ', from, to))
              return true
            }
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault()
          
              const $pos = state.doc.resolve(from)
              const parent = $pos.parent

              const parentText = $pos.parent.textContent
              const offsetInParent = $pos.parentOffset
              
              const lines = parentText.split('\n')
              
              let charCount = 0
              let currentLine = 0
              let offsetInLine = 0
              
              for (let i = 0; i < lines.length; i++) {
                if (charCount + lines[i].length >= offsetInParent) {
                  currentLine = i
                  offsetInLine = offsetInParent - charCount
                  break
                }
                charCount += lines[i].length + 1
              }
              
              const lineText = lines[currentLine]
              const textBefore = lineText.slice(0, offsetInLine)
              
              const indentMatch = textBefore.match(/^[\t ]+/)
              const indent = indentMatch ? indentMatch[0] : ''

              view.dispatch(state.tr.insertText('\n' + indent, from))
              return true
            }

            if (['(', '[', '{', '"', "'"].includes(event.key)) {
                event.preventDefault()
                const pairMap: Record<string, string> = {
                    '(': ')',
                    '[': ']',
                    '{': '}',
                    '"': '"',
                    "'": "'",
                }

                const open = event.key
                const close = pairMap[open]

                let tr = state.tr.insertText(open + close, from, to)

                tr= tr.setSelection(TextSelection.create(
                    tr.doc,
                    from + 1 
                ))

                view.dispatch(tr)
                return true
              }
              
              if ([')', ']', '}', '"', "'"].includes(event.key)) {
                const nextChar = view.state.doc.textBetween(
                  state.selection.from,
                  state.selection.from + 1
                )
              
                if (nextChar === event.key) {
                  event.preventDefault()
                  view.dispatch(
                    state.tr.setSelection(TextSelection.create(
                      state.tr.doc,
                      state.selection.from + 1 
                    ))
                  )
                  return true
                }
              }
 
            return false
          },
        },
      }),
    ]
  }
})

