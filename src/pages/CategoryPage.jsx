import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useBlogRequest from "../hooks/useBlogRequest";
import { Box, Container, Typography } from "@mui/material";
import BlogCard from "../components/BlogCard";

const CategoryPage = () => {
  const [categoryId, setCategoryId] = useState(null);
  const [categoryBlogs, setCategoryBlogs] = useState([]);

  const { categoryName } = useParams();
  const { blogs, categories } = useSelector((state) => state.blog);
  const { getRequest } = useBlogRequest();

  useEffect(() => {
    getRequest("blogs");
    getRequest("categories");
  }, []);

  //tıklandığında ilgili kategorinin id sini alıyoruz.
  useEffect(() => {
    const category = categories?.find((cate) => cate.name === categoryName);
    setCategoryId(category?._id);
  }, [categoryName]);

  //ilgili kategoriye göre blogları filtreleme yapıyoruz
  useEffect(() => {
    const categoryBlogs = blogs.filter(
      (blog) => blog.categoryId === categoryId
    );
    setCategoryBlogs(categoryBlogs);
  }, [categoryId]);

  console.log(categoryBlogs);
  return (
    <Container sx={{pt:4}}>
        <Typography variant="h5" sx={{backgroundColor:"green"}} textAlign={"center"}>{categoryName} Blogs</Typography>
      <Box pt={4}>
        {categoryBlogs.map((blog) => (
          <BlogCard {...blog} />
        ))}
      </Box>
    </Container>
  );
};

export default CategoryPage;
