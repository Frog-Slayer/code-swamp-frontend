import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AuthState{
    accessToken: string | null
    signupToken: string | null
    isAuthenticated: boolean
}

const initialState: AuthState = {
    accessToken: null,
    signupToken: null,
    isAuthenticated: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken(state, action: PayloadAction<string>) {
          state.accessToken = action.payload
          state.isAuthenticated = true
        },
        setSignupToken(state, action: PayloadAction<string>) {
          state.signupToken = action.payload
        },
        logout(state) {
          state.accessToken = null
          state.signupToken = null
          state.isAuthenticated = false
        },
      }
})

export const { setAccessToken, setSignupToken, logout } = authSlice.actions
export default authSlice.reducer