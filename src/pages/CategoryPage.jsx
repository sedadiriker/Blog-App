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
      const categoryBlogs = blogs.filter((blog) => blog.categoryId === category._id);
      setCategoryBlogs(categoryBlogs);
    }
  }, [categoryName, blogs, categories, getRequest]);

  return (
    <Container sx={{ pt: 4 }}>
      <Typography pb={5} textAlign={'center'} variant="h6" color={"#723C45"} textTransform={'uppercase'} fontWeight={"bold"}>{categoryName} Blogs</Typography>
      <Box display={"flex"} flexWrap={"wrap"} rowGap={2}>
        {categoryBlogs.map((blog) => (
          <BlogCard key={blog._id} {...blog} />
        ))}
      </Box>
    </Container>
  );
};

export default CategoryPage;
