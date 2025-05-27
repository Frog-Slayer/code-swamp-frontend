import Modal from "@/components/ui/Modal/Modal"
import Thumbnail from "./Thumbnail";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface PublishModalProps{
    isOpen: boolean
    handleClose: () => void
    submit?: () => void
    title?: string
}

const PublishModal = ({ isOpen, handleClose, submit, title } : PublishModalProps) => {

    return (
        <Modal isOpen={isOpen} handleClose={handleClose}>
        <div className="flex flex-col gap-4 max-w-lg w-full p-6">
          <div className="text-2xl font-bold text-gray-900 break-words">
            {title || '제목 없음'}
          </div>
            
          <Thumbnail />
          <textarea
            placeholder="설명"
            rows={3}
            className="w-full resize-y p-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="slug"
            spellCheck={false}
            className="w-full p-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex items-center gap-2">
            <Switch id="publicity-setting" className="cursor-pointer"/>
            <Label htmlFor="publicity-setting" className="select-none">공개</Label>
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <Button onClick={handleClose} className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md">취소</Button>
            <Button onClick={submit} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">확인</Button>
          </div>
        </div>
      </Modal>
    )
}

export default PublishModal