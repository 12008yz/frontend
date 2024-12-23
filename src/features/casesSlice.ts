import { createSlice } from '@reduxjs/toolkit';
import { casesApi } from '../app/services/cases/CaseServices'; 
import { Case } from '../app/types'; 

const casesSlice = createSlice({
    name: 'cases',
    initialState: {
        cases: [] as Case[],
        selectedCase: null as Case | null,
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

export const { setCases, setSelectedCase } = casesSlice.actions;
export default casesSlice.reducer;

export const {
    useGetCasesQuery,
    useGetCaseQuery,
} = casesApi;