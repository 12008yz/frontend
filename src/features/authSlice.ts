import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
}

const initialState: AuthState = {
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        saveTokens(state, action: PayloadAction<{ accessToken: string; refreshToken?: string }>) {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken || ''; // Если refreshToken не передан, используй пустую строку
            localStorage.setItem('accessToken', action.payload.accessToken);
            localStorage.setItem('refreshToken', action.payload.refreshToken || '');
          },
        clearTokens(state) {
            state.accessToken = null;
            state.refreshToken = null;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        },
    },
});

// Экспортируйте действия
export const { saveTokens, clearTokens } = authSlice.actions;

// Экспортируйте редюсер
export default authSlice.reducer;

// Селекторы
export const selectAccessToken = (state: { auth: AuthState }) => state.auth.accessToken;
export const selectRefreshToken = (state: { auth: AuthState }) => state.auth.refreshToken;