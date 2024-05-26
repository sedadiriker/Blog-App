import useAxios from "./useAxios";
import { useDispatch, useSelector } from "react-redux";
import {
  addRequestSuccess,
  deleteSuccess,
  editSuccess,
  fetchfail,
  fetchstart,
  getBlogSuccess,
  getRequestSuccess,
  paginationSuccess,
  postLikeSuccess,
  putRequestSuccess,
} from "../features/blogSlice";
import { toastSuccessNotify, toastErrorNotify } from "../helper/ToastNotify";
import { useNavigate } from "react-router-dom";

const useBlogRequest = () => {
  const { axiosToken } = useAxios();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const{blog}=useSelector(state => state.blog)

  const getRequest = async (path, limit = null) => {
    dispatch(fetchstart());
    try {
      let url = `/${path}`;
      if (limit !== null) {
        url += `?limit=${limit}`;
      }
      const { data } = await axiosToken(url);
      const getData = data.data;
      dispatch(getRequestSuccess({ path, getData }));
    } catch (error) {
      dispatch(fetchfail());
      toastErrorNotify(`Failed to load ${path}`);
    }
  };

  const getBlog = async(id)=>{
    dispatch(fetchstart());
    try {
      const { data } = await axiosToken(`blogs/${id}`);
      const getData = data.data;
      dispatch(getBlogSuccess({getData }));
    } catch (error) {
      dispatch(fetchfail());
      toastErrorNotify(`Failed to load blog`);
    }
  }

  const addRequest = async (path, formData) => {
    dispatch(fetchstart());
    try {
      const { data } = await axiosToken.post(`/${path}/`, formData);
      const addData = data.data;
      dispatch(addRequestSuccess({ path, addData }));
      if (path === "comments") {
        getRequest("comments", 10000000);
        getBlog(formData.blogId)
      } else {
        getRequest(path);
      }
      toastSuccessNotify("Added  successfully.");
    } catch (err) {
      dispatch(fetchfail());
      toastErrorNotify("Failed to add .");
      console.log(err);
    }
  };

  // const putRequest = async (path, id, ) => {
  //   dispatch(fetchstart());
  //   try {
  //     const { data } = await axiosToken.put(`/${path}/${id}`,);
  //     const updateData = data.new;
  //     dispatch(putRequestSuccess({ path, updateData }));
  //     //   toastSuccessNotify("Update successfully.");
  //   } catch (err) {
  //     dispatch(fetchfail());
  //     //   toastErrorNotify("Failed to update.");
  //     console.log(err);
  //   }
  // };

  const getBlogsPage = async (page, limit) => {
    dispatch(fetchstart());
    try {
      const { data } = await axiosToken(`/blogs?page=${page}&limit=${limit}`);
      dispatch(paginationSuccess(data));
    } catch (error) {
      dispatch(fetchfail());
      toastErrorNotify(`Failed to load`);
    }
  };

  const postLike = async (blogId) => {
    dispatch(fetchstart());
    try {
      const { data } = await axiosToken.post(`/blogs/${blogId}/postLike`);
      dispatch(postLikeSuccess({ data, blogId }));
      getBlog(blogId)
    } catch (err) {
      dispatch(fetchfail());
      toastErrorNotify("Failed to add .");
      console.log(err);
    }
  };

  const deleteRequest = async (path,id) => {
    dispatch(fetchstart());
    try {
      await axiosToken.delete(`/${path}/${id}`);
      dispatch(deleteSuccess({path, id }));
      if(path === "comments"){
        getRequest("comments",1099990464565);
        const comment = blog.comments.filter(comment => comment._id ===id)[0]
        console.log(comment)
        getBlog(comment.blogId)
      }else{
        getRequest(path);
      }
      if(path === "blogs"){
        navigate("/myblog")
      };
      toastSuccessNotify("deleted successfully.");
    } catch (error) {
      dispatch(fetchfail());
      toastErrorNotify("Failed to delete.");
      console.log(error);
    }
  };

  const editRequest = async (id, formData) => {
    dispatch(fetchstart());
    try {
      const { data } = await axiosToken.put(`/blogs/${id}`, formData);
      const updateData = data.new;
      dispatch(editSuccess({ updateData }));
      getRequest("blogs");
      toastSuccessNotify("Update successfully.");
    } catch (err) {
      dispatch(fetchfail());
      toastErrorNotify("Failed to update.");
      console.log(err);
    }
  };

  return {
    getRequest,
    addRequest,
    getBlogsPage,
    postLike,
    deleteRequest,
    editRequest,
    getBlog
  };
};

export default useBlogRequest;
