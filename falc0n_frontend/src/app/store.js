import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from './counter/counterSlice';
import sidebarReducer from './views/sidebar/sidebarSlice';
import storesReducer from './views/stores/storesSlice';

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    stores: storesReducer,
  },
});
