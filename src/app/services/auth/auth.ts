import { api } from '../../api';
import { saveTokens, clearTokens } from '../../../features/authSlice';

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: ({ email, password }) => ({
                url: '/users/login',
                method: 'POST',
                body: { email, password },
            }),
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(saveTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken }));
                } catch (err) {
                    console.error(err)
                }
            },
        }),
        register: builder.mutation({
            query: ({ email, password, username, profilePicture }) => ({
                url: '/users/register',
                method: 'POST',
                body: {
                    email,
                    password,
                    username,
                    profilePicture: profilePicture ? profilePicture : "",
                },
            }),
        }),
        me: builder.query({
            query: () => '/users/me',
        }),
        refreshToken: builder.mutation({
            query: (refreshToken) => ({
                url: '/users/refresh-token',
                method: 'POST',
                body: { refreshToken },
            }),
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(saveTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken }));
                } catch (err) {
                    dispatch(clearTokens());
                }
            },
        }),
    }),
});

// Экспортируйте хуки для использования в компонентах
export const {
    useLoginMutation,
    useRegisterMutation,
    useMeQuery,
    useRefreshTokenMutation,
} = authApi;