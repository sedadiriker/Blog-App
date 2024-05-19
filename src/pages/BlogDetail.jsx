import { Avatar, Box, Container, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useBlogRequest from "../hooks/useBlogRequest";

const BlogDetail = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [writer, setWriter] = useState(null);
  const { blogs, users } = useSelector((state) => state.blog);
  const { getRequest } = useBlogRequest();
  const { id } = useParams();

  useEffect(() => {
    getRequest("blogs");
    getRequest("users");
  }, []);

  useEffect(() => {
    if (blogs) {
      const blog = blogs.find((blog) => blog._id === id);
      setSelectedBlog(blog);
    }
  }, [blogs, id]);

  useEffect(() => {
    if (selectedBlog && users) {
      const writerUser = users.find((user) => user._id === selectedBlog.userId);
      setWriter(writerUser);
    }
  }, [selectedBlog, users]);

  console.log(writer);

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
      <Typography textAlign={"justify"}>{selectedBlog?.content}</Typography>
    </Container>
  );
};

export default BlogDetail;
