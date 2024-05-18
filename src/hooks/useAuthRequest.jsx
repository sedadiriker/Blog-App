import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  registerSuccess,
  logoutSuccess,
} from "../features/auhtSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAxios from "./useAxios";

const useAuthRequest = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { axiosToken, axiosBase } = useAxios();
  
    //! LOGİN
    const login = async (userData) => {
      dispatch(fetchStart());
      try {
        const { data } = await axiosBase.post("/auth/login", userData);
        dispatch(loginSuccess(data));
        toastSuccessNotify("Login process successful");
        navigate("/");
      } catch (error) {
        dispatch(fetchFail());
        toastErrorNotify("Login failed");
        console.log(error);
      }
    };
  
    //! REGİSTER
    const register = async (userInfo) => {
      dispatch(fetchStart());
      try {
        const { data } = await axiosBase.post("/users/", userInfo);
        dispatch(registerSuccess(data));
        navigate("/");
      } catch (error) {
        dispatch(fetchFail());
        console.log(error)
      }
    };
  
    //! LOGOUT
    const logout = async () => {
      dispatch(fetchStart());
      try {
        await axiosToken.get("/auth/logout");
        dispatch(logoutSuccess());
      } catch (error) {
        dispatch(fetchFail());
      }
    };
  
    return { login, register, logout };
}

export default useAuthRequest
