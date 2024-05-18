import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    blogs : [],
    categories  : [],
    loading: false,
    error : false
}

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    fetchStart: (state) => {
        state.loading = true
    },
    getRequestSuccess : (state, {payload:{path,getData}}) => {
        state.loading = false
        state[path] = getData
    },
    fetchFail: (state) => {
        state.loading = false
        state.error = true
    },
  }
});

export const {fetchStart,getRequestSuccess,fetchFail} = blogSlice.actions

export default blogSlice.reducer