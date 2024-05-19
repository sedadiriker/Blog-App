import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  registerSuccess,
  logoutSuccess,
  updateSuccess,
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
        navigate("/")
      } catch (error) {
        dispatch(fetchFail());
      }
    };

    //!update  user
    const updateUser = async (id,userInfo) => {
      dispatch(fetchStart())
      try {
        const { data } = await axiosToken.put(`/users/${id}`, userInfo);
        dispatch(updateSuccess(data.new));
        console.log("gelen veri",data.new)
        toastSuccessNotify("Profile updated successfully");
      } catch (error) {
        dispatch(fetchFail());
        toastErrorNotify("Failed to update profile");
        console.log(error)
      }
    }
  
    return { login, register, logout,updateUser };
}

export default useAuthRequest
