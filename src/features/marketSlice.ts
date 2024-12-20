import { createSlice } from '@reduxjs/toolkit';
import { marketplaceApi } from '../app/services/market/MarketServicer'; // Импортируйте ваш marketplaceApi
import { IMarketItem } from '../app/types';

const marketSlice = createSlice({
    name: 'market',
    initialState: {
        items: [] as IMarketItem[], // Массив рыночных предметов
        selectedItem: null as IMarketItem | null, // Выбранный предмет
    },
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
        setSelectedItem(state, action) {
            state.selectedItem = action.payload;
        },
    },
});

// Экспортируйте действия
export const { setItems, setSelectedItem } = marketSlice.actions;

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