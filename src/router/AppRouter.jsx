import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Navbar from "../components/Navbar/Navbar";
import { CssBaseline } from "@mui/material";
import PopularBlogs from "../pages/PopularBlogs";

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
          <Route path="popularblogs" element={<PopularBlogs />} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
