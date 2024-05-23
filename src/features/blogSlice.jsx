import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  categories: [],
  comments: [],
  users: [],
  totalPages: 0,
  loading: false,
  error: false,
};
const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    fetchstart: (state) => {
      state.loading = true
    },
    getRequestSuccess: (state, { payload: { path, getData } }) => {
      state.loading = false;
      state[path] = getData;
    },
    addRequestSuccess: (state, { payload: {path, addData } }) => {
      state[path] = [addData, ...state[path]];
      state.loading = false;
    },
    paginationSuccess: (state,{payload: {data,details: {pages: { total },
          },
        },
      }
    ) => {
      state.loading = false;
      state.blogs = data;
      state.totalPages = total;
    },
    putRequestSuccess: (state, { payload: { path, updateData } }) => {
      state.loading = false;
      state[path] = state[path].map((item) => {
        if (item.id === updateData._id) {
          return updateData;
        }
        return item;
      });
    },
    postLikeSuccess: (
      state,
      {
        payload: {
          data: { countOfLikes },
          blogId,
        },
      }
    ) => {
      state.loading = false;
      state.blogs = state.blogs.map((blog) => {
        if (blog.id === blogId) {
          return {
            ...blog,
            countOfLikes,
          };
        }
        return blog;
      });
    },
    deleteSuccess: (state, { payload: { id } }) => {
      state.loading = false;
      state.blogs = state.blogs.filter((item) => item._id === id);
    },
    editSuccess: (state, { payload: { updateData } }) => {
      state.loading = false;
      state.blogs = state.blogs.map((item) => {
        if (item.id === updateData._id) {
          return updateData;
        }
        return item;
      });
    },
    fetchfail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchstart,
  getRequestSuccess,
  addRequestSuccess,
  paginationSuccess,
  putRequestSuccess,
  addCommentSucess,
  postLikeSuccess,
  deleteSuccess,
  editSuccess,
  fetchfail,
} = blogSlice.actions;

export default blogSlice.reducer;
