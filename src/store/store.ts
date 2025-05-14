import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/authslice'
import projectReducer from '@/features/project/projectslice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
