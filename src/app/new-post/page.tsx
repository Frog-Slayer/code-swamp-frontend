'use client'

import { Button } from "@/components/ui/button";
import { DirectorySelector } from "@/features/article/components/editor/DirectorySelector";
import TiptapEditor from "@/features/article/components/editor/TiptapEditor";
import PublishModal from "@/features/article/components/PublishModal";
import { Clock } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const [isPublishModalOpen, setPublishModalOpen] = useState(false)

  const onClickPublish = () => {


  }

  return (
    <div className="flex flex-col gap-6 px-6 py-8 max-w-4xl mx-auto">
        <div className="top-0 sticky w-full border-b bg-white px-6 py-4 flex items-center justify-between">
          <DirectorySelector/>

          <div className="flex items-center space-x-2">
            <Button variant="outline"> 
              <Clock/> 히스토리 
            </Button>
            <Button variant="outline"> 저장 </Button>
            <Button className="cursor-pointer" onClick={() => setPublishModalOpen(true)}> 발행 </Button>
            <PublishModal isOpen={isPublishModalOpen} handleClose={()=>setPublishModalOpen(false)}/>
          </div>
        </div>

      <div className="prose dark:prose-invert max-w-none min-h-[300px]">
        <TiptapEditor />
      </div>
    </div>
  )
}
