import { createSlice } from '@reduxjs/toolkit';
import { User } from '../app/types';
import { userApi } from '../app/services/users/UserServicer';

interface ProfileState {
  profile: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile(state, action) {
      state.profile = action.payload;
    },
    clearProfile(state) {
      state.profile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(userApi.endpoints.getProfile.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(userApi.endpoints.getProfile.matchFulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addMatcher(userApi.endpoints.getProfile.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при загрузке профиля';
      });
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
