import { createSlice } from '@reduxjs/toolkit';
import { marketplaceApi } from '../app/services/market/MarketServicer'; 
import { IMarketItem } from '../app/types';

const marketSlice = createSlice({
    name: 'market',
    initialState: {
        items: [] as IMarketItem[], // Массив рыночных предметов
        selectedItem: null as IMarketItem | null, // Выбранный предмет
        loading: false, // Статус загрузки
        error: null as string | null, // Ошибка, если есть
    },
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
        setSelectedItem(state, action) {
            state.selectedItem = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(marketplaceApi.endpoints.getItems.matchFulfilled, (state, action) => {
                state.items = action.payload; // Успешное получение предметов
                state.loading = false;
                state.error = null;
            })
            .addMatcher(marketplaceApi.endpoints.getItems.matchRejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null; // Обработка ошибки
            })
            .addMatcher(marketplaceApi.endpoints.buyItem.matchFulfilled, (state, action) => {
                // Обработка успешной покупки предмета
                state.loading = false;
                state.error = null;
            })
            .addMatcher(marketplaceApi.endpoints.buyItem.matchRejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null; // Обработка ошибки
            })
            .addMatcher(marketplaceApi.endpoints.sellItem.matchFulfilled, (state, action) => {
                // Обработка успешной продажи предмета
                state.loading = false;
                state.error = null;
            })
            .addMatcher(marketplaceApi.endpoints.sellItem.matchRejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null; // Обработка ошибки
            });
    }
});

// Экспортируйте действия
export const { setItems, setSelectedItem, setLoading, setError } = marketSlice.actions;

// Экспортируйте редюсер
export default marketSlice.reducer;

// Используйте уже существующие хуки из marketplaceApi
export const {
    useGetItemsQuery,
    useGetItemListingsQuery,
    useSellItemMutation,
    useBuyItemMutation,
    useRemoveListingMutation,
} = marketplaceApi;
