import useAxios from "./useAxios";
import { useDispatch } from "react-redux";
import { fetchStart } from "../features/auhtSlice";
import {
  addCommentSucess,
  addRequestSuccess,
  deleteSuccess,
  editSuccess,
  fetchFail,
  getRequestSuccess,
  paginationSuccess,
  postLikeSuccess,
  putRequestSuccess,
} from "../features/blogSlice";
import { toastSuccessNotify, toastErrorNotify } from "../helper/ToastNotify";
import { useNavigate } from "react-router-dom";

const useBlogRequest = () => {
  const { axiosBase, axiosToken } = useAxios();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const getRequest = async (path, limit = null) => {
    dispatch(fetchStart());

    try {
      let url = `/${path}`;
      if (limit !== null) {
        url += `?limit=${limit}`;
      }

      const { data } = await axiosToken(url);
      const getData = data.data;
      dispatch(getRequestSuccess({ path, getData }));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`Failed to load ${path}`);
    }
  };

  const addComment = async (formData) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosToken.post(`/comments/`, formData);
      const addData = data.data;
      dispatch(addCommentSucess({ addData }));
      getRequest("comments",100000000)
      toastSuccessNotify("Added  successfully.");
    } catch (err) {
      dispatch(fetchFail());
      toastErrorNotify("Failed to add .");
      console.log(err);
    }
  };
  const addRequest = async (path, formData) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosToken.post(`/${path}/`, formData);
      const addData = data.new;
      dispatch(addRequestSuccess({ path, addData }));
      getRequest(path);
      toastSuccessNotify("Added  successfully.");
    } catch (err) {
      dispatch(fetchFail());
      toastErrorNotify("Failed to add .");
      console.log(err);
    }
  };

  const putRequest = async (path, id, formData) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosToken.put(`/${path}/${id}`, formData);
      const updateData = data.new;
      dispatch(putRequestSuccess({ path, updateData }));
      //   toastSuccessNotify("Update successfully.");
    } catch (err) {
      dispatch(fetchFail());
      //   toastErrorNotify("Failed to update.");
      console.log(err);
    }
  };

  const getBlogsPage = async (page, limit) => {
    dispatch(fetchStart());

    try {
      const { data } = await axiosToken(`/blogs?page=${page}&limit=${limit}`);
      dispatch(paginationSuccess(data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`Failed to load`);
    }
  };

  const postLike = async(blogId)=>{
    dispatch(fetchStart());
    try {
      const { data } = await axiosToken.post(`/blogs/${blogId}/postLike`);
      dispatch(postLikeSuccess({data,blogId}));
      getRequest("blogs")
    } catch (err) {
      dispatch(fetchFail());
      toastErrorNotify("Failed to add .");
      console.log(err);
    }
  }

  const deleteRequest = async (id) => {
    dispatch(fetchStart());
    try {
      await axiosToken.delete(`/blogs/${id}`); 
      dispatch(deleteSuccess({id}))
      getRequest("blogs");
      navigate("/myblog")
      toastSuccessNotify("deleted successfully.");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Failed to delete.");
      console.log(error);
    }
  }

  const editRequest = async (id,formData) => {
    dispatch(fetchStart())
    try{
      const {data} = await axiosToken.put(`/blogs/${id}`,formData)
      const updateData = data.new
      dispatch(editSuccess({updateData}))
      getRequest("blogs")
      toastSuccessNotify("Update successfully.");
    }catch(err){
      dispatch(fetchFail())
      toastErrorNotify("Failed to update.");
      console.log(err)
    }
  }

  return { getRequest, addRequest, getBlogsPage, putRequest, addComment,postLike,deleteRequest,editRequest };
};

export default useBlogRequest;
