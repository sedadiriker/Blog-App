import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  categories: [],
  comments: [],
  users: [],
  currentPage: "",
  totalPages: 0,
  loading: false,
  error: false,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    getRequestSuccess: (state, { payload: { path, getData } }) => {
      state.loading = false;
      state[path] = getData;
    },
    addRequestSuccess: (state, { payload: { addData } }) => {
      state.loading = false;
      state.comments.push(addData);
    },
    addCommentSucess: (state, { addData }) => {
      state.loading = false;
      state.comments.push(addData);
    },
    paginationSuccess: (
      state,
      {
        payload: {
          data,
          details: {
            page,
            pages: { total },
          },
        },
      }
    ) => {
      state.loading = false;
      state.blogs = data;
      state.currentPage = page;
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
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  getRequestSuccess,
  addRequestSuccess,
  paginationSuccess,
  putRequestSuccess,
  addCommentSucess,
  postLikeSuccess,
  deleteSuccess,
  editSuccess,
  fetchFail,
} = blogSlice.actions;

export default blogSlice.reducer;
