import { api } from '../../api';
import { IMarketItem } from '../../types'; // Импортируйте интерфейс IMarketItem

export const marketplaceApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getItems: builder.query<{
            totalPages: number;
            currentPage: number;
            items: any[];
          }, { page: number; filters?: any }>({
            query: ({ page, filters }) => {
              let url = `/marketplace/?page=${page}`;
              if (filters) {
                for (const key in filters) {
                  if (filters[key]) {
                    url += `&${key}=${filters[key]}`;
                  }
                }
              }
              return url;
            },
          }),
          getItemListings: builder.query<{
            totalPages: number;
            currentPage: number;
            items: any[];
          }, { itemId: number; page: number }>({
            query: ({ itemId, page }) => ({
              url: `/marketplace/item/${itemId}`,
              params: {
                page,
                limit: 30,
              },
            }),
        }),
        sellItem: builder.mutation<{ success: boolean }, { item: IMarketItem; price: number }>({
            query: ({ item, price }) => ({
                url: `/marketplace/`,
                method: 'POST',
                body: { item, price }
            }),
        }),
        buyItem: builder.mutation<{ success: boolean }, number>({
            query: (id) => ({
              url: `/marketplace/buy/${id}`,
              method: 'POST',
            }),
          }),
        removeItemFromInventory: builder.mutation<{ success: boolean }, number>({
            query: (itemId) => ({
              url: `/users/inventory/${itemId}`,
              method: 'DELETE',
            }),
          }),
          removeListing: builder.mutation<{ message: string }, number>({
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
