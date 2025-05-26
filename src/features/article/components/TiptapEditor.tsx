"use client"

import * as React from "react"
import { EditorContent, EditorContext, useEditor } from "@tiptap/react"

import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import TaskItem from "@tiptap/extension-task-item"
import TaskList from "@tiptap/extension-task-list"
import Typography from "@tiptap/extension-typography"
import Highlight from "@tiptap/extension-highlight"
import Subscript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
import Underline from "@tiptap/extension-underline"
import Placeholder from "@tiptap/extension-placeholder"
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'



import { CustomCodeBlock } from "./CustomCodeBlock"
import { Heading, getToc, TableOfContents} from "./TableOfContents"

import { all, createLowlight } from 'lowlight'

import './editor-styles.scss'
import 'highlight.js/styles/monokai.css';


const TiptapEditor = () => {
  const lowlight = createLowlight(all)
  const [toc, setToc] = React.useState<Heading[]>([]);

  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
      },
    },
    extensions: [
      StarterKit.configure({
        codeBlock: false
      }),
      CustomCodeBlock.configure({
        lowlight
      }),
      Placeholder.configure({
        placeholder: '내용 입력'
      }),
      Underline,
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Table,
      TableRow,
      TableCell,
      TableHeader,
      Typography,
      Superscript,
      Subscript,
    ],
    editable: true,
    onUpdate({ editor }) {
      setToc(getToc(editor));
    },
  })

    return (
      <div className="flex gap-6">
        <div className="flex-1 min-h-screen border p-4">
          <EditorContext.Provider value={{ editor }}>
              <div className="content-wrapper border border-gray-300 ">
                <EditorContent
                    editor={editor}
                    role="presentation"
                    placeholder="텍스트 입력"
                />
              </div>
          </EditorContext.Provider>
        </div>
        <aside className="w-64 sticky top-20 h-[calc(100vh-80px)] overflow-auto border p-4">
          <TableOfContents headings={toc} editor={editor}></TableOfContents>
        </aside>
      </div>
  )
}

export default TiptapEditor