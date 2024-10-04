import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';

const initialState = {
  currentUser: [],
  isLoading: false,
  cart: [],
};

// export const getCategories = createAsyncThunk('categories/getCategories', async (_, thunkApi) => {
//   try {
//     const res = await axios(`${BASE_URL}/categories`);
//     return res.data;
//   } catch (error) {
//     console.log(error);
//     return thunkApi.rejectWithValue(error);
//   }
// });

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addItemToCart: (state, { payload }) => {
      let newCart = [...state.cart];

      const itemInCart = newCart.find(({ id }) => id === payload.id);

      if (itemInCart) {
        newCart = newCart.map((item) =>
          item.id === payload.id
            ? { ...item, quantity: payload.quantity || item.quantity + 1 }
            : item,
        );
      } else {
        newCart.push({ ...payload, quantity: 1 });
      }

      state.cart = newCart;
    },
  },
  extraReducers: (builder) => {
    //  builder.addCase(getCategories.pending, (state) => {
    //    state.isLoading = true;
    //  });
    //  builder.addCase(getCategories.fulfilled, (state, action) => {
    //    state.categoriesList = action.payload;
    //    state.isLoading = false;
    //  });
    //  builder.addCase(getCategories.rejected, (state) => {
    //    console.log('Error');
    //    state.isLoading = false;
    //  });
  },
});

export const { addItemToCart } = userSlice.actions;

export default userSlice.reducer;
