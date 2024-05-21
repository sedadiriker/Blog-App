import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  token: "",
  loading: false,
  error: false,
};

const auhtSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // fetchStart: (state) => {
    //   state.loading = true;
    // },
    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.user = payload.user;
      state.token = payload.token;
    },
    registerSuccess: (state, { payload }) => {
      state.loading = false;
      state.user = payload.user;
      state.token = payload.token;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.user = "";
      state.token = "";
    },
    updateSuccess : (state,{payload}) => {
      state.loading = false
      state.user = {...state.user, ...payload} //! önceki verileri koru, değişenleri değiştir
      // state.token = payload.token;

    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  loginSuccess,
  fetchFail,
  registerSuccess,
  logoutSuccess,
  updateSuccess
} = auhtSlice.actions;

export default auhtSlice.reducer;
