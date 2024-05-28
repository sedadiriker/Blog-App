// Home.js
import { useSelector } from "react-redux";
import useBlogRequest from "../hooks/useBlogRequest";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import BlogCard from "../components/BlogCard";
import { Container } from "@mui/material";

const Home = () => {
  const { blogs, totalPages } = useSelector((state) => state.blog);
  const { getBlogsPage } = useBlogRequest();
  const [currentPage, setCurrentPage] = useState(1);

  const handleChangePage = (e, page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getBlogsPage(currentPage, 8);
  }, [currentPage]);
  return (
    <Container
      sx={{
        minHeight:"79vh",
        py: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
      }}
    >
      {/* BLOG CARD */}
      <Box display={"flex"} flexWrap={"wrap"} rowGap={2}>
        {blogs?.map((blog) => (
          <BlogCard key={blog._id} {...blog} />
        ))}
      </Box>

      {/* PAGİNATİON */}
      <Stack spacing={2}>
      <Pagination
      count={totalPages}
      page={currentPage}
      onChange={handleChangePage}
      sx={{
        '& .MuiPaginationItem-root': {
          '&.Mui-selected': {
            backgroundColor: '#006300',
            color: 'white',
            '&:hover': {
              backgroundColor: '#00630070',
            },
          },
          '&:hover': {
            backgroundColor: '#00630050',
          },
        },
      }}
    />
      </Stack>
    </Container>
  );
};

export default Home;
