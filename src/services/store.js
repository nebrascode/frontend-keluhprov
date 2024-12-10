import { configureStore, createSlice } from "@reduxjs/toolkit";
import newsReducer from './newsSlice';
import newsCommentReducer from './newsCommentSlice';

const initialState = {
  currentPath: "/dashboard",
  sidebarVisible: false,
};

const pathSlice = createSlice({
  name: "path",
  initialState: initialState.currentPath,
  reducers: {
    setPath: (state, action) => action.payload,
  },
});

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: initialState.sidebarVisible,
  reducers: {
    toggleSidebar: (state) => !state,
    closeSidebar: () => false,
  },
});

export const { setPath } = pathSlice.actions;
export const { toggleSidebar, closeSidebar } = sidebarSlice.actions;

const store = configureStore({
  reducer: {
    path: pathSlice.reducer,
    sidebar: sidebarSlice.reducer,
    news: newsReducer,
    newsComments: newsCommentReducer,
  },
});

export default store;
