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
import BulletList from '@tiptap/extension-bullet-list'
import { Markdown } from 'tiptap-markdown'


import { all, createLowlight } from 'lowlight'

import { Heading, getToc, TableOfContents} from "./TableOfContents"
import CustomCodeBlock from "./CustomCodeBlock"
import CustomHeading from "./CustomHeading"

import EditorTitle from "./EditorTitle"
import './editor-styles.scss'
import 'highlight.js/styles/monokai.css';



const TiptapEditor = () => {
  const lowlight = createLowlight(all)
  const [toc, setToc] = React.useState<Heading[]>([]);
  const [title, setTitle] = React.useState("")

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
        codeBlock: false,
        heading: false,
      }),
      CustomHeading,
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
      Markdown.configure({
        html: true,
        tightLists: true,
        tightListClass: 'tight',
        bulletListMarker: '-',
        linkify: true,
        breaks: true,
        transformPastedText: true,
        transformCopiedText: true,
      })
    ],
    editable: true,
    onUpdate({ editor }) {
      console.log(editor.getHTML())
      setToc(getToc(editor));
    },
  })

  const onTitlePressEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()

      const input = e.currentTarget;
      if (!editor) return;

      const cursorPos = input.selectionStart ?? 0;

      const before = title.slice(0, cursorPos);
      const after = title.slice(cursorPos);

      setTitle(before.trim());

      if (after.trim()) {
        console.log(after)
        editor.commands.insertContentAt(0, {
          type: 'paragraph',
          content: [{ type: 'text', text: after.trim()}]
        })
      }

      editor.commands.focus('start')
    }
  }

  return (
    <EditorContext.Provider value={{editor}}>
      <EditorTitle value={title} onChange={setTitle} onEnterPress={onTitlePressEnter} />
      <div className="flex gap-6">
        <div className="flex-1 min-h-screen border p-4 cursor-text" onClick={()=>editor?.chain().focus()}>
            <EditorContent
                editor={editor}
                role="presentation"
                placeholder="텍스트 입력"
            />
        </div>
        <aside className="w-64 sticky z-5 top-20 h-[calc(100vh-80px)] overflow-auto border p-4">
          <TableOfContents headings={toc} editor={editor}></TableOfContents>
        </aside>
      </div>
    </EditorContext.Provider>
  )
}

export default TiptapEditor