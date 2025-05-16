import { ReactNode } from "react";
import styles from "./Modal.module.css"


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

    return (
        <>
          <div className={styles.background}
                onClick={handleClose}
          ></div>
          <div className={styles.modal}
                onClick={handleModalClick}
          >
            {children}
          </div>
        </>
    )
}

export default Modal;