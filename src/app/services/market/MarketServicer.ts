import { api } from '../../api';

export const marketplaceApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getItems: builder.query({
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
        getItemListings: builder.query({
            query: ({ itemId, page }) => ({
                url: `/marketplace/item/${itemId}`,
                params: {
                    page,
                    limit: 30
                }
            }),
        }),
        sellItem: builder.mutation({
            query: ({ item, price }) => ({
                url: `/marketplace/`,
                method: 'POST',
                body: { item, price }
            }),
        }),
        buyItem: builder.mutation({
            query: (id) => ({
                url: `/marketplace/buy/${id}`,
                method: 'POST',
            }),
        }),
        removeListing: builder.mutation({
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