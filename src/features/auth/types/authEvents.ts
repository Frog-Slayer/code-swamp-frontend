export const AUTH_EVENT_TYPES = {
    LOGIN_SUCCESS: 'login-success',
    NEW_USER: 'new-user'
}

export interface LoginSuccessPayload {
    accessToken: string
    email: string
    name: string
    profileImage: string
}

export interface NewUserPayload {
    email: string
    name: string
    profileImage: string
}

export interface LoginSuccessEvent {
    type: typeof AUTH_EVENT_TYPES.LOGIN_SUCCESS
    payload: LoginSuccessPayload
}

export interface NewUserEvent {
    type: typeof AUTH_EVENT_TYPES.NEW_USER
    payload: NewUserPayload
}

export type AuthEvent = LoginSuccessEvent | NewUserEvent