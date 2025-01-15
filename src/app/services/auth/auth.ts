import { api } from '../../api';
import { saveTokens } from '../../../features/authSlice';
import { User } from '../../types'; // Импортируйте тип User, если он используется
import { setUser } from '../../../features/userSlice';

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
                console.log('api data:', data);
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
        me: builder.query<User, void>({
          query: () => '/users/me',
          async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
            try {
              const { data } = await queryFulfilled;
              console.log('AAAAAAAAAAAAAA:', data);
              dispatch(setUser(data));
              console.log('setUser dispatched');
            } catch (err) {
              console.error('error:', err);
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
} = authApi;