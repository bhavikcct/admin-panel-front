import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/authslice'
import projectReducer from '@/features/project/projectslice'
import estimationReducer from '@/features/estimation/estimationslice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer,
    estimation:estimationReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
