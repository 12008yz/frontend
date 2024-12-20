import { createSlice } from '@reduxjs/toolkit';
import { userApi } from '../app/services/users/UserServicer'; 
import { User } from '../app/types'; 

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null as User | null, // Данные пользователя
        loading: false, // Статус загрузки
        error: null as string | null, // Ошибка, если есть
    },
    reducers: {
        setUser (state, action) {
            state.user = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        clearUser (state) {
            state.user = null;
            state.error = null;
        },
    },
});

// Экспортируйте действия
export const { setUser , setLoading, setError, clearUser  } = userSlice.actions;

// Экспортируйте редюсер
export default userSlice.reducer;

// Используйте уже существующие хуки из userApi
export const {
    useGetUserQuery,
    useGetInventoryQuery,
    useFixItemMutation,
    usePutFixDescriptionMutation,
    useClaimBonusMutation,
    useUpdateProfilePictureMutation,
    useGetNotificationsQuery,
    useGetTopPlayersQuery,
    useGetMyRankingQuery,
} = userApi;