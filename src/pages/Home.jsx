// Home.js
import { useSelector, useDispatch } from "react-redux";
import useBlogRequest from "../hooks/useBlogRequest";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import BlogCard from "../components/BlogCard";
import { Container } from "@mui/material";

const Home = () => {
  const { blogs, totalPages } = useSelector((state) => state.blog);
  const { getBlogsPage,getRequest } = useBlogRequest();
  const [currentPage, setCurrentPage] = useState(1);

  console.log(blogs);

  useEffect(() => {
    getBlogsPage(currentPage, 8);
  }, [currentPage]);

  const handleChangePage = (e, page) => {
    setCurrentPage(page);
  };

useEffect(()=>{
  getRequest("blogs")
},[])
  return (
    <Container sx={{ py: 5, display:"flex", flexDirection:"column", alignItems:"center", gap:3,  }}>
    <Box display={"flex"} flexWrap={"wrap"} rowGap={2}>
      {blogs?.map((blog) => (
        <BlogCard key={blog._id} {...blog} />
      ))}
    </Box>
    <Stack spacing={2}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handleChangePage}
      />
    </Stack>
  </Container>
  );
};

export default Home;
