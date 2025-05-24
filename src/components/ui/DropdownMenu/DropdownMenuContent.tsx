import { ReactNode, useEffect, useRef } from "react"
import { useDropdownMenuContext } from "./DropdownMenu"


interface DropdownMenuContntProps {
    children: ReactNode
    className?: string
}

export const DropdownMenuContent = ({children, className} : DropdownMenuContntProps) => {
    const { open, setOpen, triggerRef } = useDropdownMenuContext()
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
          if (ref.current && 
            !ref.current.contains(e.target as Node) && 
            !triggerRef.current?.contains(e.target as Node)
        ) {
            setOpen(false);
          }
        };
    
        if (open) {
          document.addEventListener("mousedown", handleClickOutside);
        }
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [open, setOpen, triggerRef]);

    if (!open) return null

    return (
        <div className={className} ref={ref}>{children}</div>
    )
}