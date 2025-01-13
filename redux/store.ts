import { configureStore } from '@reduxjs/toolkit';
import { UserApi } from './api/UserApi';
import userReducer from './slices/pageSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    [UserApi.reducerPath]: UserApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(UserApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
