import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AuthState{
    accessToken: string | null
    isAuthenticated: boolean
}

const initialState: AuthState = {
    accessToken: null,
    isAuthenticated: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken(state, action: PayloadAction<{ accessToken: string }>) {
          state.accessToken = action.payload.accessToken;
          state.isAuthenticated = true;
        },
        logout(state) {
          state.accessToken = null;
          state.isAuthenticated = false;
        },
      }
})

export const { setAccessToken, logout } = authSlice.actions;
export default authSlice.reducer;