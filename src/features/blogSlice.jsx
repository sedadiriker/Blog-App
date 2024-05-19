import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    blogs : [],
    categories  : [],
    comments : [],
    currentPage : '',
    totalPages: 0,
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
    addRequestSuccess : (state ,{payload:{path,addData}}) => {
      state.loading = false
      state[path].push(addData)
    },
    paginationSuccess: (state, { payload: { data, details:{page, pages:{total},}} }) => {
      state.loading = false;
      state.blogs = data
    state.currentPage = page;
    state.totalPages = total; 
  },
    fetchFail: (state) => {
        state.loading = false
        state.error = true
    },
  }
});

export const {fetchStart,getRequestSuccess,addRequestSuccess,paginationSuccess,fetchFail} = blogSlice.actions

export default blogSlice.reducer