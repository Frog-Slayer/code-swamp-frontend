import { ReactNode } from "react";
import styles from "./Modal.module.css"
import { createPortal } from "react-dom";


interface ModalProps {
    isOpen: boolean;
    handleClose: () => void;
    children?: ReactNode;
};

const Modal = ({isOpen, handleClose, children}: ModalProps) => {
    if (!isOpen) return null;

    const handleModalClick= (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return createPortal(
        <>
          <div className={styles.background}
                onClick={handleClose}
          ></div>
          <div className={styles.modal}
                onClick={handleModalClick}
          >
            {children}
          </div>
        </>,
        document.body
    )
}

export default Modal;