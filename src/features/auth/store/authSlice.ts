import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AuthState{
    accessToken: string
    signupToken: string
    isAuthLoading: boolean
    isAuthenticated: boolean
}

const initialState: AuthState = {
    accessToken: '',
    signupToken: '',
    isAuthLoading: true,
    isAuthenticated: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessTokenAction(state, action: PayloadAction<string>) {
          state.accessToken = action.payload
          state.isAuthenticated = true
        },
        setSignupTokenAction(state, action: PayloadAction<string>) {
          state.signupToken = action.payload
        },
        setAuthLoadingAction(state, action: PayloadAction<boolean>) {
          state.isAuthLoading = action.payload
        },
        clear(state) {
          state.accessToken = ''
          state.signupToken = ''
          state.isAuthenticated = false
        },
      }
})

export const { setAccessTokenAction, setSignupTokenAction, setAuthLoadingAction, clear } = authSlice.actions
export default authSlice.reducer