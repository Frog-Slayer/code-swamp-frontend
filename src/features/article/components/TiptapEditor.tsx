"use client"

import * as React from "react"
import { EditorContent, EditorContext, useEditor } from "@tiptap/react"

import { StarterKit } from "@tiptap/starter-kit"
import { Image } from "@tiptap/extension-image"
import { TaskItem } from "@tiptap/extension-task-item"
import { TaskList } from "@tiptap/extension-task-list"
import { TextAlign } from "@tiptap/extension-text-align"
import { Typography } from "@tiptap/extension-typography"
import { Highlight } from "@tiptap/extension-highlight"
import { Subscript } from "@tiptap/extension-subscript"
import { Superscript } from "@tiptap/extension-superscript"
import { Underline } from "@tiptap/extension-underline"
import { Placeholder } from "@tiptap/extension-placeholder"
import { CodeBlockLowlight} from "@tiptap/extension-code-block-lowlight"
import { CustomCodeBlock } from "./CustomCodeBlock"

import { all, createLowlight } from 'lowlight'

import './editor-styles.scss'
import 'highlight.js/styles/monokai.css';


const TiptapEditor = () => {
  const lowlight = createLowlight(all)

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
      Typography,
      Superscript,
      Subscript,
    ],
    editable: true
  })
  

    return (
    <EditorContext.Provider value={{ editor }}>
          <div className="content-wrapper border border-gray-300 ">
          <EditorContent
              editor={editor}
              role="presentation"
              placeholder="텍스트 입력"
          />
        </div>
    </EditorContext.Provider>
  )
}

export default TiptapEditor