"use client"

import {useEditor, EditorEvents } from "@tiptap/react"

import StarterKit from "@tiptap/starter-kit"
import TaskItem from "@tiptap/extension-task-item"
import TaskList from "@tiptap/extension-task-list"
import Typography from "@tiptap/extension-typography"
import Highlight from "@tiptap/extension-highlight"
import Underline from "@tiptap/extension-underline"
import Placeholder from "@tiptap/extension-placeholder"
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import Image from '@tiptap/extension-image'
import { all, createLowlight } from 'lowlight'
import { Markdown } from 'tiptap-markdown'

import CustomCodeBlock from "./customExtensions/CustomCodeBlock"
import CustomHeading from "./customExtensions/CustomHeading"
import CustomPasteImageExtension from "./customExtensions/CustomPasteImageExtension"

interface CustomEditorProps{ 
  onUpdate?: (events: EditorEvents['update']) => void
}

export const useCustomEditor = ({ onUpdate } : CustomEditorProps)   => {
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
        codeBlock: false,
        heading: false,
      }),
      Image.configure({
        inline: false
      }),
      CustomHeading,
      CustomCodeBlock.configure({
        lowlight
      }),
      Placeholder.configure({
        placeholder: '내용 입력'
      }),
      CustomPasteImageExtension,
      Underline,
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Table,
      TableRow,
      TableCell,
      TableHeader,
      Typography,
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
    autofocus: true,
    editable: true,
    onUpdate
  })

  return editor
}