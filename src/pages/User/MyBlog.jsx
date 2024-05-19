import { Box, Container } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useBlogRequest from "../../hooks/useBlogRequest";
import BlogCard from "../../components/BlogCard";

const MyBlog = () => {
    const{user}=useSelector(state=>state.auth)
    const{blogs}=useSelector(state=>state.blog)
    const{getRequest}=useBlogRequest()

    const myBlogs = blogs.filter(blog => blog.userId === user._id)
    // console.log(myBlogs)

    useEffect(()=>{
        getRequest("blogs")
    },[])
  return (
    <Container
      sx={{
        py: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
      }}
    > <Box display={"flex"} flexWrap={"wrap"} rowGap={2}>
      {myBlogs.map((blog) => (
        <BlogCard key={blog._id} {...blog} />
      ))}
    </Box></Container>
  );
};

export default MyBlog;
