import { createSlice } from '@reduxjs/toolkit';
import { gamesApi } from '../app/services/games/GamesServices'; // Импортируйте ваш gamesApi

const gamesSlice = createSlice({
    name: 'games',
    initialState: {
        loading: false, // Состояние загрузки
        error: null as string | null, // Ошибка, если есть
        gameResults: null as any, // Результаты операций (например, открытие коробки)
        selectedItem: null as any, // Выбранный предмет для улучшения
    },
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload; // Установка состояния загрузки
        },
        setError(state, action) {
            state.error = action.payload; // Установка ошибки
        },
        setGameResults(state, action) {
            state.gameResults = action.payload; // Установка результатов операций
        },
        setSelectedItem(state, action) {
            state.selectedItem = action.payload; // Установка выбранного предмета
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(gamesApi.endpoints.openBox.matchFulfilled, (state, action) => {
                state.gameResults = action.payload; // Успешное открытие коробки
                state.loading = false;
                state.error = null;
            })
            .addMatcher(gamesApi.endpoints.openBox.matchRejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null; // Обработка ошибки
            })
            .addMatcher(gamesApi.endpoints.upgradeItem.matchFulfilled, (state, action) => {
                // Обработка успешного улучшения предмета
                state.loading = false;
                state.error = null;
            })
            .addMatcher(gamesApi.endpoints.upgradeItem.matchRejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null; // Обработка ошибки
            })
            .addMatcher(gamesApi.endpoints.spinSlots.matchFulfilled, (state, action) => {
                // Обработка успешного вращения слотов
                state.loading = false;
                state.error = null;
            })
            .addMatcher(gamesApi.endpoints.spinSlots.matchRejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null; // Обработка ошибки
            });
    }
});

// Экспортируйте редюсеры
export const { setLoading, setError, setGameResults, setSelectedItem } = gamesSlice.actions;

// Экспортируйте редюсер
export default gamesSlice.reducer;

// Используйте уже существующие хуки из gamesApi
export const {
    useOpenBoxMutation,
    useUpgradeItemMutation,
    useSpinSlotsMutation,
} = gamesApi;
