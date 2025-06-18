'use client'

import React, { useEffect, useRef } from "react"

interface ArticleTitleEditorProps {
  value: string
  onChange: (val: string) => void
  onEnterPress?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
  className?: string
}

const ArticleTitleEditor = ({ value, onChange, onEnterPress, className }: ArticleTitleEditorProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"
    }
  }, [value])

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={e => onChange(e.target.value)}
      onKeyDown={onEnterPress}
      placeholder="제목을 입력하세요"
      className={className}
      rows={1}
      style={{ whiteSpace: "pre-wrap" }}
    />
  )
}

export default ArticleTitleEditor