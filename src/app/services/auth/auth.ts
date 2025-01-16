import { api } from '../../api';
import { saveTokens } from '../../../features/authSlice';
import { User } from '../../types'; // Импортируйте тип User, если он используется

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<{ token: string }, { email: string; password: string }>({
            query: ({ email, password }) => ({
              url: '/users/login',
              method: 'POST',
              body: { email, password },
            }),
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
              try {
                const { data } = await queryFulfilled;
                dispatch(saveTokens({ accessToken: data.token, refreshToken: '' })); // Используй data.token
              } catch (err) {
                console.error(err);
              }
            },
          }),
        register: builder.mutation<User, { email: string; password: string; username: string; }>({
            query: ({ email, password, username }) => ({
                url: '/users/register',
                method: 'POST',
                body: {
                    email,
                    password,
                    username,
                },
            }),
        }),
        me: builder.query<{
          id: number;
          username: string;
          profilePicture: string;
          xp: number;
          level: number;
          walletBalance: number;
          nextBonus: Date;
          fixedItem: any;
          hasUnreadNotifications: boolean;
        }, void>({
          query: () => '/users/me',
        }),
    }),
});

// Экспортируйте хуки для использования в компонентах
export const {
    useLoginMutation,
    useRegisterMutation,
    useMeQuery,
} = authApi;