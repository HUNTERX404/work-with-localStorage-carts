import { configureStore } from "@reduxjs/toolkit";

import products from "./productsSlice";
import carts from "./cartSlice";

const store = configureStore({ reducer: { products, carts } });
export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
