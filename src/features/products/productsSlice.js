import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { BASE_URL } from '../../utils/constants';
import { shuffle } from '../../utils/common';

const initialState = {
  productsList: [],
  related: [],
  filtered: [],
  isLoading: false,
};

export const getProducts = createAsyncThunk('products/getProducts', async (_, thunkApi) => {
  try {
    const res = await axios(`${BASE_URL}/products`);
    return res.data;
  } catch (err) {
    console.log(err);
    return thunkApi.rejectWithValue(err);
  }
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    filterByPrice: (state, { payload }) => {
      state.filtered = state.productsList.filter(({ price }) => price < payload);
    },
    getRelatedProducts: (state, { payload }) => {
      const list = state.productsList.filter(({ category: { id } }) => id === payload);
      state.related = shuffle(list);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.productsList = payload;
      state.isLoading = false;
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { filterByPrice, getRelatedProducts } = productsSlice.actions;

export default productsSlice.reducer;
