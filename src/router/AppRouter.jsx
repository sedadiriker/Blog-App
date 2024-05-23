import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Home from "../pages/Home";
import Navbar from "../components/Navbar/Navbar";
import { CssBaseline } from "@mui/material";
import PopularBlogs from "../pages/PopularBlogs";
import CategoryPage from "../pages/CategoryPage";
import PrivateRouter from "./PrivateRouter";
import UserProfile from "../pages/User/UserProfile";
import WriteBlog from "../pages/WriteBlog";
import LatestBlogs from "../pages/LatestBlogs";
import MyBlog from "../pages/User/MyBlog";
import BlogDetail from "../pages/BlogDetail";
import Footer from "../components/Footer";
import About from "../pages/About";
import Contact from "../pages/Contact";

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
            <Route path="writeblog" element={<WriteBlog />} />
            <Route path="latestblogs" element={<LatestBlogs />} />
            <Route path="myblog" element={<MyBlog />} />
            <Route path="blogdetail/:id" element={<BlogDetail />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route
              path="/categories/:categoryName"
              element={<CategoryPage />}
            />
          </Route>
        </Routes>
        <Footer/>
      </Router>
    </>
  );
};

export default AppRouter;
