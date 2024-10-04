import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';

const initialState = {
  currentUser: null,
  cart: [],
  isLoading: false,
  formType: 'signup',
  showForm: false,
};

export const createUser = createAsyncThunk('users/createUser', async (payload, thunkAPI) => {
  try {
    const res = await axios.post(`${BASE_URL}/users`, payload);
    return res.data;
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err);
  }
});

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
    toggleForm: (state, { payload }) => {
      state.showForm = payload;
    },
  },
  extraReducers: (builder) => {
    //   builder.addCase(getCategories.pending, (state) => {
    //     state.isLoading = true;
    //   });
    builder.addCase(createUser.fulfilled, (state, { payload }) => {
      state.currentUser = payload;
    });
    //   builder.addCase(getCategories.rejected, (state) => {
    //     console.log('Error');
    //     state.isLoading = false;
    //   });
  },
});

export const { addItemToCart, toggleForm } = userSlice.actions;

export default userSlice.reducer;
