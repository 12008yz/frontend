import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../app/services/auth/auth'; // Импортируйте ваш authApi

interface User {
    id: number;
    username: string;
    profilePicture: string; // URL изображения профиля
    walletBalance: number; // Баланс кошелька
    level: number; // Уровень пользователя
    xp: number; // Опыт пользователя
    nextBonus: Date; // Дата следующего бонуса
    fixedItem?: { // Опционально, если фиксированный предмет не установлен
        image: string;
        name: string;
        description: string;
        rarity: string; // Редкость предмета
    };
    hasUnreadNotifications: boolean; // Статус наличия непрочитанных уведомлений
}

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    user: User | null; // Добавлено свойство user
    loading: boolean; // Состояние загрузки
    error: string | null; // Ошибка, если есть
}

const initialState: AuthState = {
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    user: JSON.parse(localStorage.getItem('user') || 'null'), // Восстановление пользователя из localStorage
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        saveTokens(state, action: PayloadAction<{ accessToken: string; refreshToken?: string; user: User }>) {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken || '';
            state.user = action.payload.user; // Сохранение информации о пользователе
            localStorage.setItem('accessToken', action.payload.accessToken);
            localStorage.setItem('refreshToken', action.payload.refreshToken || '');
            localStorage.setItem('user', JSON.stringify(action.payload.user)); // Сохранение пользователя в localStorage
        },
        clearTokens(state) {
            state.accessToken = null;
            state.refreshToken = null;
            state.user = null; // Очистка информации о пользователе
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user'); // Удаление пользователя из localStorage
        },
        setLoading(state, action) {
            state.loading = action.payload; // Установка состояния загрузки
        },
        setError(state, action) {
            state.error = action.payload; // Установка ошибки
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
                state.accessToken = action.payload.token; // Успешный вход
                state.refreshToken = ''; // Установите refreshToken, если он доступен
                state.user = action.payload.user; // Сохранение информации о пользователе
                state.loading = false;
                state.error = null;
                localStorage.setItem('user', JSON.stringify(action.payload.user)); // Сохранение пользователя в localStorage
            })
            .addMatcher(authApi.endpoints.login.matchRejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null; // Обработка ошибки
            })
            .addMatcher(authApi.endpoints.register.matchFulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addMatcher(authApi.endpoints.register.matchRejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null; // Обработка ошибки
            });
    },
});

// Экспортируйте действия
export const { saveTokens, clearTokens, setLoading, setError } = authSlice.actions;

// Экспортируйте редюсер
export default authSlice.reducer;

// Селекторы
export const selectAccessToken = (state: { auth: AuthState }) => state.auth.accessToken;
export const selectRefreshToken = (state: { auth: AuthState }) => state.auth.refreshToken;
export const selectUser = (state: { auth: AuthState }) => state.auth.user; // Селектор для получения пользователя
