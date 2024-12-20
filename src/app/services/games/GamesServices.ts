import { api } from '../../api'; // Импортируйте ваш api с fetchBaseQuery

export const gamesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        openBox: builder.mutation({
            query: ({ id, quantity }) => ({
                url: `/games/openCase/${id}`,
                method: 'POST',
                body: { quantity: quantity || 1 }
            }),
        }),
        upgradeItem: builder.mutation({
            query: ({ selectedItemIds, targetItemId }) => ({
                url: `/games/upgrade/`,
                method: 'POST',
                body: { selectedItemIds, targetItemId }
            }),
        }),
        spinSlots: builder.mutation({
            query: (betAmount) => ({
                url: `/games/slots/`,
                method: 'POST',
                body: { betAmount }
            }),
        }),
    }),
});

// Экспортируйте хуки для использования в компонентах
export const {
    useOpenBoxMutation,
    useUpgradeItemMutation,
    useSpinSlotsMutation,
} = gamesApi;