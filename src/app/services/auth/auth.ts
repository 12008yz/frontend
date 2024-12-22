import { api } from '../../api';
import { saveTokens, clearTokens } from '../../../features/authSlice';
import { User } from '../../types'; // Импортируйте тип User, если он используется

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<{ accessToken: string; refreshToken: string }, { email: string; password: string }>({
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
                    console.error(err);
                }
            },
        }),
        register: builder.mutation<User, { email: string; password: string; username: string; profilePicture?: string }>({
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
        me: builder.query<User, void>({
            query: () => '/users/me',
        }),
        refreshToken: builder.mutation<{ accessToken: string; refreshToken: string }, string>({
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