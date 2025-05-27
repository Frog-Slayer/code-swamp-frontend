'use client'

import React, { useEffect, useRef, useState } from "react"

interface EditorTitleProps {
  value: string
  onChange: (val: string) => void
  onEnterPress?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
}

export default function EditorTitle({ value, onChange, onEnterPress }: EditorTitleProps) {
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
      rows={1}
      className="text-3xl font-bold outline-none w-full max-w-2xl resize-none overflow-hidden"
      style={{ whiteSpace: "pre-wrap" }}
    />
  )
}