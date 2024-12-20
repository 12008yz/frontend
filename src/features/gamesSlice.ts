import { createSlice } from '@reduxjs/toolkit';
import { gamesApi } from '../app/services/games/GamesServices'; // Импортируйте ваш gamesApi

const gamesSlice = createSlice({
    name: 'games',
    initialState: {
        loading: false, // Состояние загрузки
        error: null, // Ошибка, если есть
        gameResults: null, // Результаты операций (например, открытие коробки)
        selectedItem: null, // Выбранный предмет для улучшения
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