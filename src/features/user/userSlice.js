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

const addCurrentUser = (state, { payload }) => {
  state.currentUser = payload;
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

export const loginUser = createAsyncThunk('users/loginUser', async (payload, thunkAPI) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, payload);
    const login = await axios.get(`${BASE_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${res.data.access_token}`,
      },
    });

    return login.data;
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err);
  }
});

export const updateUser = createAsyncThunk('users/updateUser', async (payload, thunkAPI) => {
  try {
    const res = await axios.put(`${BASE_URL}/users/${payload.id}`, payload);
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
    removeItemFromCart: (state, { payload }) => {
      state.cart = state.cart.filter(({ id }) => id !== payload);
    },
    toggleForm: (state, { payload }) => {
      state.showForm = payload;
    },
    toggleFormType: (state, { payload }) => {
      state.formType = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, addCurrentUser);
    builder.addCase(loginUser.fulfilled, addCurrentUser);
    builder.addCase(updateUser.fulfilled, addCurrentUser);
  },
});

export const { addItemToCart, removeItemFromCart, toggleForm, toggleFormType } = userSlice.actions;

export default userSlice.reducer;
