import { createSlice } from '@reduxjs/toolkit';
import { gamesApi } from '../app/services/games/GamesServices';
import { BasicItem } from '../app/types';

interface OpenBoxResult {
  success: boolean;
  items: BasicItem[];
}

interface GamesState {
  loading: boolean;
  error: string | null;
  gameResults: OpenBoxResult | null;
  selectedItem: BasicItem | null;
}

const initialState: GamesState = {
  loading: false,
  error: null,
  gameResults: null,
  selectedItem: null,
};

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setGameResults(state, action) {
      state.gameResults = action.payload;
    },
    setSelectedItem(state, action) {
      state.selectedItem = action.payload;
    },
    clearGameResults(state) {
      state.gameResults = null;
    },
    clearSelectedItem(state) {
      state.selectedItem = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(gamesApi.endpoints.openBox.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(gamesApi.endpoints.openBox.matchFulfilled, (state, action) => {
        state.gameResults = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addMatcher(gamesApi.endpoints.openBox.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to open box';
      })
      .addMatcher(gamesApi.endpoints.upgradeItem.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(gamesApi.endpoints.upgradeItem.matchFulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addMatcher(gamesApi.endpoints.upgradeItem.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to upgrade item';
      })
      .addMatcher(gamesApi.endpoints.spinSlots.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(gamesApi.endpoints.spinSlots.matchFulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addMatcher(gamesApi.endpoints.spinSlots.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to spin slots';
      });
  },
});

export const { 
  setLoading, 
  setError, 
  setGameResults, 
  setSelectedItem,
  clearGameResults,
  clearSelectedItem
} = gamesSlice.actions;

// Селекторы
export const selectGameResults = (state: { games: GamesState }) => state.games.gameResults;
export const selectSelectedItem = (state: { games: GamesState }) => state.games.selectedItem;
export const selectGamesLoading = (state: { games: GamesState }) => state.games.loading;
export const selectGamesError = (state: { games: GamesState }) => state.games.error;

export default gamesSlice.reducer;

export const {
  useOpenBoxMutation,
  useUpgradeItemMutation,
  useSpinSlotsMutation,
} = gamesApi;
