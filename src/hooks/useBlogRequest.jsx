import useAxios from './useAxios'
import { useDispatch } from 'react-redux'
import { fetchStart } from '../features/auhtSlice'
import { addRequestSuccess, fetchFail, getRequestSuccess, paginationSuccess, putRequestSuccess } from '../features/blogSlice'
import { toastSuccessNotify, toastErrorNotify } from "../helper/ToastNotify";

const useBlogRequest = () => {
    const {axiosBase, axiosToken} = useAxios()
    const dispatch = useDispatch()
 
    const getRequest = async (path) => {
        dispatch(fetchStart())

        try{
            const {data}= await axiosToken(`/${path}`)
            const getData = data.data
            dispatch(getRequestSuccess({path,getData}))
        }catch(error){
            dispatch(fetchFail());
      toastErrorNotify(`Failed to loading ${path}`);
        }
    }

    const addRequest = async(path,formData) => {
        dispatch(fetchStart())
        try{
            const {data} = await axiosToken.post(`/${path}/`,formData)
            const addData = data.new
            dispatch(addRequestSuccess({path,addData}))
            getRequest(path)
            toastSuccessNotify("Added Blog successfully.");
          }catch(err){
            dispatch(fetchFail())
            toastErrorNotify("Failed to add blog.");
            console.log(err)
          }
    }

    const putRequest = async(path,id,formData) => {
        dispatch(fetchStart())
    try{
      const {data} = await axiosToken.put(`/${path}/${id}`,formData)
      const updateData = data.new
      dispatch(putRequestSuccess({path,updateData}))
      toastSuccessNotify("Update successfully.");
    }catch(err){
      dispatch(fetchFail())
      toastErrorNotify("Failed to update.");
      console.log(err)
    }
    }

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

    return {getRequest, addRequest, getBlogsPage,putRequest}
}

export default useBlogRequest
