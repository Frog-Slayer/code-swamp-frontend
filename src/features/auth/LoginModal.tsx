import Modal from "@/components/ui/Modal/Modal"
import SocialLoginButton from "./components/SocialLoginButton";
import { useEffect } from "react";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLoginSuccess: () => void;
}

const LoginModal = ({isOpen, onClose, onLoginSuccess}: LoginModalProps) => {
    useEffect(() => {
        function handleMessage(event: MessageEvent) {
            if (event.origin !== window.origin) return;
            if (event.data.type === 'login-success'){
            }
            else if (event.data.type === 'new-user') {


            }
            onClose()
        }

        window.addEventListener('message', handleMessage)
        return () => window.removeEventListener('message', handleMessage)
    }, [onClose, onLoginSuccess])


    return (
        <Modal isOpen={isOpen} handleClose={onClose}>
            <SocialLoginButton label = "Google로 로그인 하기"
                               provider="google"/>
            <SocialLoginButton label = "Github로 로그인 하기"
                                provider="github"/>
        </Modal>
    )
}

export default LoginModal;