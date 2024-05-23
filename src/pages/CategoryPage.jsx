import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useBlogRequest from "../hooks/useBlogRequest";
import { Box, Container, Typography } from "@mui/material";
import BlogCard from "../components/BlogCard";

const CategoryPage = () => {
  const [categoryBlogs, setCategoryBlogs] = useState([]);
  const { categoryName } = useParams();
  const { blogs, categories } = useSelector((state) => state.blog);
  const { getRequest } = useBlogRequest();

  useEffect(() => {
    getRequest("blogs");
    getRequest("categories");
  }, []);

  useEffect(() => {
    const category = categories?.find((cate) => cate.name === categoryName);
    if (category) {
      const categoryBlogs = blogs.filter(
        (blog) => blog.categoryId === category._id
      );
      setCategoryBlogs(categoryBlogs);
    }
  }, [categoryName, blogs, categories, getRequest]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight={"79vh"}
      py={2}
      px={15}
    >
      {" "}
      <Typography
        pb={5}
        textAlign={"center"}
        variant="h6"
        color={"#723C45"}
        textTransform={"uppercase"}
        fontWeight={"bold"}
        sx={{
          bgcolor: "#FFE2A880",
          borderTopRightRadius: "10px",
          borderBottomLeftRadius: "10px",
          width: { xs: "75vw", md: "50vw" },
          py: 1,
          mb:1,
          letterSpacing: ".3rem",
        }}
      >
        {categoryName} Blogs
      </Typography>
      <Box display={"flex"} flexWrap={"wrap"} gap={2} >
        {categoryBlogs.map((blog) => (
          <BlogCard key={blog._id} {...blog} />
        ))}
      </Box>
    </Box>
  );
};

export default CategoryPage;
