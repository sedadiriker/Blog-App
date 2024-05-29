import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useBlogRequest from "../hooks/useBlogRequest";
import { Box } from "@mui/material";
import BlogCard from "../components/BlogCard";
import PageName from "../components/PageName";
import { BoxContainer } from "../styles/globalStyles";

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
      // Şuan pek farketmiyor ama çok fazla blog olduğunu düşünürsek hepsini çekip filter işlemi yapmaktansa backendden sadece ilgili kategoriye ait blogları çekmek performans açısından daha iyi olabilir. "const res = await axiosToken(`/blogs/?search[categoryId]=${id}`);"
      setCategoryBlogs(categoryBlogs);
    }
  }, [categoryName]);

  return (
    <Box sx={BoxContainer} px={15}>
      <PageName title={`${categoryName} Blogs`} />
      {/* BLOG CARD */}
      <Box display={"flex"} flexWrap={"wrap"} gap={2} pt={1}>
        {categoryBlogs.map((blog) => (
          <BlogCard key={blog._id} {...blog} />
        ))}
      </Box>
    </Box>
  );
};

export default CategoryPage;
