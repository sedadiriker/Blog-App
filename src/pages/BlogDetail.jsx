import { Avatar, Box, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useBlogRequest from "../hooks/useBlogRequest";

const BlogDetail = () => {
    const [writer, setWriter] = useState(null);
  const { blogs, users } = useSelector((state) => state.blog);
  const { getRequest, putRequest } = useBlogRequest();
  const { id } = useParams();
  const selectedBlog = blogs.find((blog) => blog._id === id);

  useEffect(() => {
    getRequest("blogs");
    getRequest("users");
  }, []);


  useEffect(() => {
      const writerUser = users.find((user) => user._id === selectedBlog.userId);
      setWriter(writerUser);
  }, []);


useEffect(()=>{
    if (selectedBlog) {
    putRequest("blogs", id, { countOfVisitors: selectedBlog.countOfVisitors + 1 })};
},[])

console.log(selectedBlog)
  return (
    <Container
      sx={{
        py: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      {" "}
      <Typography
        variant="h6"
        pb={2}
        textAlign={"center"}
        color={"#723C45"}
        fontWeight={"bold"}
        textTransform={"uppercase"}
      >
        {selectedBlog?.title}
      </Typography>
      <Box sx={{ width: { xs: "80vw", md: "50vw" }, height: 400 }}>
        <img
          src={selectedBlog?.image}
          alt={selectedBlog?.title}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        gap={3}
        sx={{ width: { xs: "80vw", md: "50vw" } }}
      >
        <Avatar
          alt={writer?.username}
          src="/"
          sx={{ backgroundColor: "#C96F1F70", color: "#5B92A8" }}
        />
        <Box>
          {writer?.username ? (
            <Typography
              fontWeight={"bold"}
              textTransform={"uppercase"}
              color={"#5B92A8"}
            >
              {writer?.username}
            </Typography>
          ) : (
            <Typography
              fontWeight={"bold"}
              textTransform={"uppercase"}
              color="#5B92A8"
            >
              Clarusway
            </Typography>
          )}
          <Typography fontSize={"12px"} color="gray">
            {new Date(selectedBlog?.createdAt).toLocaleString("tr-TR")}
          </Typography>
        </Box>
      </Box>
      <Typography textAlign="justify">
        <span
          style={{
            fontSize: "4rem",
            marginLeft: "3rem",
            float: "left",
            marginRight: "10px",
            lineHeight: "90%",
            textShadow: "3px 3px #C0C0C0",
            color:"#5B92A8"
          }}
        >
          {selectedBlog?.content.slice(0, 1)}
        </span>
        {selectedBlog?.content.slice(1)}
      </Typography>
    </Container>
  );
};

export default BlogDetail;
