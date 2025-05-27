import { Plugin, TextSelection } from '@tiptap/pm/state'
import Heading from '@tiptap/extension-heading'

export const CustomHeading = Heading.extend({
    addProseMirrorPlugins() {
        return [
            ...this.parent?.() || [],
            new Plugin({
                props: {
                handleKeyDown: (view, event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                        const { state, dispatch } = view;
                        const { selection, schema, tr } = state;
                        const { $from } = selection;
                        const node = $from.parent;
          
                        if (!node.type.name.startsWith('heading')) {
                          return false;
                        }

                        const offset = $from.parentOffset;
                        const fullText = node.textContent;

                        const beforeText = fullText.slice(0, offset);
                        const afterText = fullText.slice(offset);

                        if (!afterText.trim() || offset === 0) {
                            return false;
                        }
            
                        const headingPos = $from.before(1);
            
                        const newTr = tr
                            .replaceWith(
                                headingPos,
                                headingPos + node.nodeSize,
                                schema.nodes.heading.create(node.attrs, schema.text(beforeText))
                            )
                            .insert(
                                headingPos + beforeText.length + 1,
                                schema.nodes.paragraph.create({}, schema.text(afterText))
                            )
                            .setSelection(
                                TextSelection.create(
                                    tr.doc,
                                    headingPos + beforeText.length + 2
                                )
                            )

                        dispatch(newTr)
                        return true
                    }
                    return false
                }
            },
            }),
        ]
    },
})

export default CustomHeading