import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { TProduct } from "../utils/types";

const sliceName = "carts";
export const getCarts = createAsyncThunk(
  `${sliceName}/getProducts`,
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await JSON.parse(localStorage.getItem("cart")!);
      return await res;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

type InitialStateProperty = {
  data: Array<TProduct>;
  loading: boolean;
  error: any;
  totalPrice: number;
};
const initialState: InitialStateProperty = {
  data: [],
  loading: true,
  error: null,
  totalPrice: 0,
};
const cartSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    removeProductCart: (
      state: InitialStateProperty,
      action: PayloadAction<number>
    ) => {
      state.totalPrice -=
        state.data[action.payload].price * state.data[action.payload].amount!;
      state.data.splice(action.payload, 1);
      localStorage.setItem("cart", JSON.stringify(state.data));
      return state;
    },
    updateProductCart: (
      state: InitialStateProperty,
      action: PayloadAction<{
        id: number;
        type?: "add" | "sub" | "any";
        amount?: number;
      }>
    ) => {
      if (action.payload.type === "add") {
        state.data[action.payload.id].amount! += 1;
        state.totalPrice += state.data[action.payload.id].price;
      } else if (action.payload.type === "sub") {
        state.data[action.payload.id].amount! -= 1;
        state.totalPrice -= state.data[action.payload.id].price;
      } else {
        state.data[action.payload.id].amount = action.payload.amount;
        state.totalPrice = 0;
        state.data.forEach((product) => {
          state.totalPrice += product.price * product.amount!;
        });
      }
      localStorage.setItem("cart", JSON.stringify(state.data));
      return state;
    },
    orderAllCart: (state: InitialStateProperty) => {
      state.data = [];
      localStorage.setItem("cart", JSON.stringify(state.data));
      state.totalPrice = 0;
      return state;
    },
  },
  extraReducers(builder) {
    builder.addCase(getCarts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      getCarts.fulfilled,
      (state, action: PayloadAction<Array<TProduct>>) => {
        state.loading = false;
        state.data = action.payload;
        if (action.payload) {
          action.payload.forEach((product) => {
            state.totalPrice += product.price * product.amount!;
          });
        }
      }
    );
    builder.addCase(getCarts.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.totalPrice = 0;
      state.error = action.error.message;
    });
  },
});
export const { removeProductCart, orderAllCart, updateProductCart } =
  cartSlice.actions;

export const selectCarts = (state: any) => state.carts;
export default cartSlice.reducer;
