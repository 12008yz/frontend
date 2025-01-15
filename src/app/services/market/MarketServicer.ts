import { api } from '../../api';
import { IMarketItem } from '../../types'; // Импортируйте интерфейс IMarketItem

export const marketplaceApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getItems: builder.query<IMarketItem[], { page: number; filters: any }>({
            query: ({ page, filters }) => {
                const { name, rarity, sortBy, order } = filters;
                return {
                    url: `/marketplace`,
                    params: {
                        page,
                        limit: 30,
                        name,
                        rarity,
                        sortBy,
                        order
                    }
                };
            },
        }),
        getItemListings: builder.query<IMarketItem[], { itemId: number; page: number }>({
            query: ({ itemId, page }) => ({
                url: `/marketplace/item/${itemId}`,
                params: {
                    page,
                    limit: 30
                }
            }),
        }),
       sellItem: builder.mutation<{ success: boolean }, { item: IMarketItem; price: number }>({
    query: ({ item, price }) => ({
        url: `/marketplace/`,
        method: 'POST',
        body: { id: item.id, price } // Извлечение id из item
    }),
}),
        buyItem: builder.mutation<{ success: boolean }, number>({
            query: (id) => ({
                url: `/marketplace/buy/${id}`,
                method: 'POST',
            }),
        }),
        removeListing: builder.mutation<{ success: boolean }, number>({
            query: (id) => ({
                url: `/marketplace/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

// Экспортируйте хуки для использования в компонентах
export const {
    useGetItemsQuery,
    useGetItemListingsQuery,
    useSellItemMutation,
    useBuyItemMutation,
    useRemoveListingMutation,
} = marketplaceApi;
