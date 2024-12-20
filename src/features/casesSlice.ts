import { createSlice } from '@reduxjs/toolkit';
import { casesApi } from '../app/services/cases/CaseServices'; // Импортируйте ваш casesApi
import { Case } from '../app/types'; // Импортируйте интерфейс Case

const casesSlice = createSlice({
    name: 'cases',
    initialState: {
        cases: [] as Case[], // Массив кейсов
        selectedCase: null as Case | null, // Выбранный кейс
    },
    reducers: {
        setCases(state, action) {
            state.cases = action.payload;
        },
        setSelectedCase(state, action) {
            state.selectedCase = action.payload;
        },
    },
});

// Экспортируйте действия
export const { setCases, setSelectedCase } = casesSlice.actions;

// Экспортируйте редюсер
export default casesSlice.reducer;

// Используйте уже существующие хуки из casesApi
export const {
    useGetCasesQuery,
    useGetCaseQuery,
} = casesApi;