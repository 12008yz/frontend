import { createAsyncThunk } from '@reduxjs/toolkit';
import { gamesApi } from '../app/services/games/GamesServices';
import { userApi } from '../app/services/users/UserServicer';

export const openBoxAndRefreshUser = createAsyncThunk(
  'games/openBoxAndRefreshUser',
  async (params: { id: number; quantity?: number }, { dispatch }) => {
    const result = await dispatch(gamesApi.endpoints.openBox.initiate(params)).unwrap();
    await dispatch(userApi.endpoints.getMe.initiate());
    return result;
  }
);
