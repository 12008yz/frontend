import { api } from '../../api'; // Импортируйте ваш api с fetchBaseQuery

export const casesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCases: builder.query({
            query: () => '/cases/',
        }),
        getCase: builder.query({
            query: (id) => `/cases/${id}`,
        }),
    }),
});

// Экспортируйте хуки для использования в компонентах
export const {
    useGetCasesQuery,
    useGetCaseQuery,
} = casesApi;