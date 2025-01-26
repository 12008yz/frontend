import { createSlice } from '@reduxjs/toolkit';
import { userApi } from '../app/services/users/UserServicer'; 
import { authApi } from '../app/services/auth/auth'; 
import { User } from '../app/types'; 

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: JSON.parse(localStorage.getItem('user') || 'null'), // Восстановление пользователя из localStorage
        loading: false,
        error: null as string | null,
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload)); // Сохранение пользователя в localStorage
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        clearUser(state) {
            state.user = null;
            state.error = null;
            localStorage.removeItem('user'); // Удаление пользователя из localStorage
        },
    },
    extraReducers: (builder) => {
        // Auth actions
        builder
            .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
                state.user = action.payload.user || null; // Убедитесь, что user не undefined
                state.loading = false;
                state.error = null;
                localStorage.setItem('user', JSON.stringify(action.payload.user)); // Сохранение пользователя в localStorage
            })
            .addMatcher(authApi.endpoints.login.matchRejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null; // Убедитесь, что error не undefined
            })
            .addMatcher(authApi.endpoints.register.matchFulfilled, (state, action) => {
                state.user = action.payload || null; // Используйте payload напрямую
                state.loading = false;
                state.error = null;
                localStorage.setItem('user', JSON.stringify(action.payload)); // Сохранение пользователя в localStorage
            })
            .addMatcher(authApi.endpoints.register.matchRejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null; // Убедитесь, что error не undefined
            });

        // User actions
        builder
            .addMatcher(userApi.endpoints.getUser.matchFulfilled, (state, action) => {
                state.user = action.payload || null; // Используйте payload напрямую
                state.loading = false;
                state.error = null;
                localStorage.setItem('user', JSON.stringify(action.payload)); // Сохранение пользователя в localStorage
            })
            .addMatcher(userApi.endpoints.getUser.matchRejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null; // Убедитесь, что error не undefined
            })
            .addMatcher(userApi.endpoints.getInventory.matchFulfilled, (state, action) => {
                // Обработка успешного получения инвентаря
                state.loading = false;
                state.error = null;
            })
            .addMatcher(userApi.endpoints.getInventory.matchRejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null; // Убедитесь, что error не undefined
            })
            .addMatcher(userApi.endpoints.claimBonus.matchFulfilled, (state, action) => {
                // Обработка успешного получения бонуса
                state.loading = false;
                state.error = null;
            })
            .addMatcher(userApi.endpoints.claimBonus.matchRejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null; // Убедитесь, что error не undefined
            });
    }
});

// Экспортируйте действия
export const { setUser, setLoading, setError, clearUser } = userSlice.actions;

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
