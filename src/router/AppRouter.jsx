import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Home from "../pages/Home";
import Navbar from "../components/Navbar/Navbar";
import { CssBaseline } from "@mui/material";
import PopularBlogs from "../pages/PopularBlogs";
import CategoryPage from "../pages/CategoryPage";
import PrivateRouter from "./PrivateRouter";
import UserProfile from "../pages/auth/UserProfile";

const AppRouter = () => {
  return (
    <>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="" element={<PrivateRouter/>}>
            <Route path="popularblogs" element={<PopularBlogs />} />
            <Route path="userprofile" element={<UserProfile />} />
            <Route
              path="/categories/:categoryName"
              element={<CategoryPage />}
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
