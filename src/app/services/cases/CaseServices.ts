import { api } from '../../api';
import { Case } from '../../types'; // Импортируйте интерфейс Case

export const casesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCases: builder.query<Case[], void>({
            query: () => '/cases/',
        }),
        getCase: builder.query<Case, number>({
            query: (id) => `/cases/${id}`,
        }),
    }),
});

// Экспортируйте хуки для использования в компонентах
export const {
    useGetCasesQuery,
    useGetCaseQuery,
} = casesApi;