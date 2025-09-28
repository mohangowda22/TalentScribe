import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface AppState {
  resume: File | null;
  jobs: any[];
  applications: any[];
  status: any[];
}

const initialState: AppState = {
  resume: null,
  jobs: [],
  applications: [],
  status: [],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setResume(state, action: { payload: File | null }) {
      state.resume = action.payload;
    },
    setJobs(state, action: { payload: any[] }) {
      state.jobs = action.payload;
    },
    setApplications(state, action: { payload: any[] }) {
      state.applications = action.payload;
    },
    setStatus(state, action: { payload: any[] }) {
      state.status = action.payload;
    },
  },
});

export const { setResume, setJobs, setApplications, setStatus } = appSlice.actions;

const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
