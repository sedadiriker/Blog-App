import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useBlogRequest from "../../hooks/useBlogRequest";
import BlogCard from "../../components/BlogCard";
import { useNavigate } from "react-router-dom";

const MyBlog = () => {
  const { user } = useSelector((state) => state.auth);
  const { blogs } = useSelector((state) => state.blog);
  const { getRequest } = useBlogRequest();
  const navigate = useNavigate()

  const myBlogs = blogs.filter((blog) => blog.userId === user._id);
  // console.log(myBlogs)

  useEffect(() => {
    getRequest("blogs");
  }, []);
  return (
    <Container
      sx={{
        minHeight: "79vh",
        py: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent:"center",
        gap: 3,
      }}
    >
      {" "}
      <Box display={"flex"} flexWrap={"wrap"} rowGap={2} >
        {myBlogs.length > 0 ? (
          myBlogs.map((blog) => <BlogCard key={blog._id} {...blog} />)
        ) : (
          <Typography textAlign={"center"} sx={{fontSize:{xs:"12px", md:"1rem"}}}>You haven't added any blogs yet. <br/> Click the <Button sx={{color:"green"}} onClick={()=>navigate("/writeblog")}>Add New Blog</Button> button to add your first blog.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default MyBlog;
