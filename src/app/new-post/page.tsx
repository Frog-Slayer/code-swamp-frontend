'use client'

import { Button } from "@/components/ui/button";
import { DirectorySelector } from "@/features/article/components/DirectorySelector";
import EditorTitle from "@/features/article/components/EditorTitle";
import TiptapEditor from "@/features/article/components/TiptapEditor";
import { Clock } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const [title, setTitle] = useState("")

  return (
    <>
      <div className="w-full border-b bg-white px-6 py-4 flex items-center justify-between">
        <DirectorySelector/>

        <div className="flex items-center space-x-2">

          <Button variant="outline"> 
            <Clock/> 히스토리 
          </Button>
          <Button variant="outline"> 저장 </Button>
          <Button> 발행 </Button>
        </div>
      </div>

      <div className="flex flex-col gap-6 px-6 py-8 max-w-4xl mx-auto">
        <EditorTitle value={title} onChange={setTitle}/>
      <div className="prose dark:prose-invert max-w-none min-h-[300px]">
        <TiptapEditor />
      </div>
      </div>
    </>
  )
}
