// PasteImageExtension.ts
import { postImage } from '@/lib/api/image/postImage'
import { Extension } from '@tiptap/core'
import { Plugin } from '@tiptap/pm/state'

export const CustomPasteImageExtension = Extension.create({
  name: 'pasteImage',

  addProseMirrorPlugins() {
    const editor = this.editor

    return [
      new Plugin({
        props: {
          handlePaste: (view, event) => {
            const items = event.clipboardData?.items
            if (!items) return false

            for (const item of items) {
              if (item.type.indexOf('image') !== -1) {
                const image = item.getAsFile()

                if (image) {
                  postImage({ image })
                    .then(({url}) => {
                      editor.chain()
                        .focus()
                        .setImage({src: url})
                        .run()
                    })
                    .catch((err) => {
                      return false
                    })

                  return true
                }
              }
            }
            return false
          },
        },
      }),
    ]
  },
})
