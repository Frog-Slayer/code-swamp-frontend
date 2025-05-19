import Modal from "@/components/ui/Modal/Modal"
import SocialLoginButton from "./SocialLoginButton";
import { useEffect } from "react";
import { AUTH_EVENT_TYPES, AuthEvent, LoginSuccessPayload, NewUserPayload } from "../types/authEvents";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLoginSuccess: (payload: LoginSuccessPayload) => void;
    onNewUser: (payload: NewUserPayload) => void;
}

const LoginModal = ({isOpen, onClose, onLoginSuccess, onNewUser}: LoginModalProps) => {
    useEffect(() => {
        function handleMessage(event: MessageEvent) {
            if (event.origin !== window.origin) return;
            
            const data = event.data

            switch (data.type) {
                case AUTH_EVENT_TYPES.LOGIN_SUCCESS:
                    onLoginSuccess(data.payload)
                    break

                case AUTH_EVENT_TYPES.NEW_USER:
                    onNewUser(data.payload)
                    break
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