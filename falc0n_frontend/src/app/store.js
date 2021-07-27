import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from './counter/counterSlice';
import sidebarReducer from './views/sidebar/sidebarSlice';

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
  },
});
