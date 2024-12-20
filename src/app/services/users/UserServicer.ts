import { api } from '../../api'; // Импортируйте ваш api с fetchBaseQuery

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUser:builder.query({
            query: (id: string) => `/users/${id}`,
        }),
        getInventory: builder.query({
            query: ({ id, page = 1, filters }: { id: string; page?: number; filters?: any }) => {
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
        fixItem: builder.mutation({
            query: (item: string) => ({
                url: `/users/fixedItem/`,
                method: 'PUT',
                body: { item },
            }),
        }),
        putFixDescription: builder.mutation({
            query: (description: string) => ({
                url: `/users/fixedItem/description`,
                method: 'PUT',
                body: { description },
            }),
        }),
        claimBonus: builder.mutation({
            query: () => ({
                url: `/users/claimBonus`,
                method: 'POST',
            }),
        }),
        updateProfilePicture: builder.mutation({
            query: (image: string) => ({
                url: `/users/profilePicture/`,
                method: 'PUT',
                body: { image },
            }),
        }),
        getNotifications: builder.query({
            query: (page = 1) => `/users/notifications?page=${page}`,
        }),
        getTopPlayers: builder.query({
            query: () => `/users/topPlayers`,
        }),
        getMyRanking: builder.query({
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