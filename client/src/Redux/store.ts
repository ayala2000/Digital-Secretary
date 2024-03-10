import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import turnReducer from './turnSlice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    turns: turnReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch