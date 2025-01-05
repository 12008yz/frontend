import { api } from '../../api';
import { User } from '../../types'; // Импортируйте тип User

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUser:builder.query<User, string>({
            query: (id) => `/users/${id}`,
        }),
        getInventory: builder.query<any, { id: number; page?: number; filters?: any }>({
            query: ({ id, page = 1, filters }) => {
                let url = `/users/inventory/${id}?page=${page}`;
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
        fixItem: builder.mutation<{ success: boolean }, string>({
            query: (item) => ({
                url: `/users/fixedItem/`,
                method: 'PUT',
                body: { item },
            }),
        }),
        putFixDescription: builder.mutation<{ success: boolean }, string>({
            query: (description) => ({
                url: `/users/fixedItem/description`,
                method: 'PUT',
                body: { description },
            }),
        }),
        claimBonus: builder.mutation<{
            success: boolean;
            message: string; // Добавьте это поле
            nextBonus: string; // Добавьте это поле
            value: number; // Добавьте это поле
        }, void>({
            query: () => ({
                url: `/users/claimBonus`,
                method: 'POST',
            }),
        }),
        updateProfilePicture: builder.mutation<{ success: boolean }, string>({
            query: (image) => ({
                url: `/users/profilePicture/`,
                method: 'PUT',
                body: { image },
            }),
        }),
        getNotifications: builder.query<any, number>({
            query: (page = 1) => `/users/notifications?page=${page}`,
        }),
        getTopPlayers: builder.query<any, void>({
            query: () => `/users/topPlayers`,
        }),
        getMyRanking: builder.query<any, void>({
            query: () => `/users/ranking`,
        }),
    }),
});

// Экспортируйте хуки для использования в компонентах
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