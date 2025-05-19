export const AUTH_EVENT_TYPES = {
    LOGIN_SUCCESS: 'login-success',
    NEW_USER: 'new-user'
}

export interface LoginSuccessPayload {
    accessToken: string
    refreshToken: string
}

export interface NewUserPayload {
    email: string
    name: string
    profileImage: string
}

export interface LoginSuccessEvent {
    type: typeof AUTH_EVENT_TYPES.LOGIN_SUCCESS
    tokens: LoginSuccessPayload
}

export interface NewUserEvent {
    type: typeof AUTH_EVENT_TYPES.NEW_USER
    userInfo: NewUserPayload
}

export type AuthEvent = LoginSuccessEvent | NewUserEvent