import useAxios from './useAxios'
import { useDispatch } from 'react-redux'
import { fetchStart } from '../features/auhtSlice'
import { fetchFail, getRequestSuccess } from '../features/blogSlice'
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
    return {getRequest}
}

export default useBlogRequest
