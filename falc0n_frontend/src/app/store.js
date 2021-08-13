import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from './counter/counterSlice';
import sidebarReducer from './views/sidebar/sidebarSlice';
import storesReducer from './views/stores/storesSlice';
import errorReducer from './views/Error/errorSlice';
import customersReducer from './views/customers/customersSlice';
import modalReducer from './views/Modal/modalSlice';

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    stores: storesReducer,
    customers: customersReducer,
    error: errorReducer,
    Modal: modalReducer
  },
});
