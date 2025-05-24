import { ReactNode, useEffect, useRef } from "react"
import { useDropdownMenuContext } from "./DropdownMenu"

interface DropdownMenuTriggerProps{
    children: ReactNode
    className?: string
}

export const DropdownMenuTrigger = ({children, className }: DropdownMenuTriggerProps) => {
    const { toggle, triggerRef} = useDropdownMenuContext()

    return (
        <div ref={triggerRef} className={className} onClick={toggle}>{children}</div>
    )
}