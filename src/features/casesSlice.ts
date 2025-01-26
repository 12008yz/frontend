import { createSlice } from '@reduxjs/toolkit';
import { casesApi } from '../app/services/cases/CaseServices'; 
import { Case } from '../app/types'; 

const casesSlice = createSlice({
    name: 'cases',
    initialState: {
        cases: [] as Case[],
        selectedCase: null as Case | null,
        loading: false, // Состояние загрузки
        error: null as string | null, // Ошибка, если есть
    },
    reducers: {
        setCases(state, action) {
            state.cases = action.payload;
        },
        setSelectedCase(state, action) {
            state.selectedCase = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload; // Установка состояния загрузки
        },
        setError(state, action) {
            state.error = action.payload; // Установка ошибки
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(casesApi.endpoints.getCases.matchFulfilled, (state, action) => {
                state.cases = action.payload; // Успешное получение кейсов
                state.loading = false;
                state.error = null;
            })
            .addMatcher(casesApi.endpoints.getCases.matchRejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null; // Обработка ошибки
            });
    }
});

// Экспортируйте редюсеры
export const { setCases, setSelectedCase, setLoading, setError } = casesSlice.actions;

// Экспортируйте редюсер
export default casesSlice.reducer;

// Используйте уже существующие хуки из casesApi
export const {
    useGetCasesQuery,
    useGetCaseQuery,
} = casesApi;
