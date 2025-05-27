import Modal from "@/components/ui/Modal/Modal"
import Thumbnail from "./Thumbnail";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export interface PublishModalProps{
    isOpen: boolean
    title: string
    summary: string
    isPublic: boolean
    thumbnailUrl: string
    slug: string

    setSummary: (value: string) => void
    setPublic: (value: boolean) => void
    setThumbnailUrl: (value: string) => void
    setSlug: (value: string) => void

    handleClose: () => void
    submit?: () => void
}

const PublishModal = (props : PublishModalProps) => {

    return (
        <Modal isOpen={props.isOpen} handleClose={props.handleClose}>
        <div className="flex flex-col gap-4 max-w-lg w-full p-6">
          <div className="text-2xl font-bold text-gray-900 break-words">
            {props.title || '제목 없음'}
          </div>
            
          <Thumbnail />
          <textarea
            className="w-full resize-y p-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="설명"
            rows={3}
            maxLength={200}
            value={props.summary}
            onChange={(e) => props.setSummary(e.target.value)}
          />
          <div>{props.summary.length} / 200</div>
          <input
            type="text"
            placeholder="slug"
            spellCheck={false}
            className="w-full p-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={props.slug}
            onChange={(e) => props.setSlug(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <Switch id="publicity-setting" className="cursor-pointer" onCheckedChange={(checked) => props.setPublic(checked)}/>
            <Label htmlFor="publicity-setting" className="select-none">공개</Label>
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <Button onClick={props.handleClose} className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md">취소</Button>
            <Button onClick={props.submit} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">확인</Button>
          </div>
        </div>
      </Modal>
    )
}

export default PublishModal