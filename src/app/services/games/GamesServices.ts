import { api } from '../../api';

export const gamesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        openBox: builder.mutation<{ items: any[] }, { id: number; quantity?: number }>({
            query: ({ id, quantity }) => ({
              url: `/case/openCase/${id}`,
              method: 'POST',
              body: { quantity },
            }),
          }),
          upgradeItem: builder.mutation<any, { selectedItemIds: number[]; targetItemId: number }>({
            query: ({ selectedItemIds, targetItemId }) => ({
              url: `/games/upgrade/`,
              method: 'POST',
              body: { selectedItemIds, targetItemId },
            }),
          }),
          spinSlots: builder.mutation<any, number>({
            query: (betAmount) => ({
              url: `/games/slots/`,
              method: 'POST',
              body: { betAmount },
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