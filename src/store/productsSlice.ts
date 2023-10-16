import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../utils/axios";
import apiRoutes from "../utils/api_routes";
import { TProduct } from "../utils/types";

const sliceName = "products";
export const getProducts = createAsyncThunk(
  `${sliceName}/getProducts`,
  async (params: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(apiRoutes.products.index.all, params);
      return await res.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const getProductsItem = createAsyncThunk(
  `${sliceName}/getProductsItem`,
  async (props: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(apiRoutes.products.index.show(props.id));
      return await res.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
type InitialStateProperty = {
  data: any;
  loading: boolean;
  error: any;
  dataItem: any;
  loadingItem: boolean;
  errorItem: any;
};
const initialState: InitialStateProperty = {
  data: null,
  loading: true,
  error: null,
  dataItem: null,
  loadingItem: true,
  errorItem: null,
};
const productSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      getProducts.fulfilled,
      (state, action: PayloadAction<Array<TProduct>>) => {
        state.loading = false;
        state.data = action.payload;
      }
    );
    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
    builder.addCase(getProductsItem.pending, (state) => {
      state.loadingItem = true;
      state.errorItem = null;
    });
    builder.addCase(
      getProductsItem.fulfilled,
      (state, action: PayloadAction<Array<any>>) => {
        state.loadingItem = false;
        state.dataItem = action.payload;
      }
    );
    builder.addCase(getProductsItem.rejected, (state, action) => {
      state.loadingItem = false;
      state.dataItem = [];
      state.errorItem = action.error.message;
    });
  },
});
export const selectProducts = (state: any) => state.products;
export default productSlice.reducer;
