import {
  Avatar,
  Box,
  Button,
  Container,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useBlogRequest from "../hooks/useBlogRequest";
import EditBlogModal from "../components/Modals/EditBlogModal";
import ShowComment from "../components/ShowComment";
import IconButtons from "../components/IconButtons";
import DeleteBlogModal from "../components/Modals/DeleteBlogModal";

const BlogDetail = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [writer, setWriter] = useState(null);
  const [showComment, setShowComment] = useState(false);
  const { blogs, users } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.auth);
  const { getRequest, putRequest, deleteRequest } = useBlogRequest();
  const { id } = useParams();

  //? Modal ile editleme ve silme işlemleri
  const handleDelete = () => {
    setShowDeleteModal(true);
  };
  const handleEdit = () => {
    setShowEditModal(true);
  };
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };
  const handleConfirmEdit = () => {
    setShowComment(false);
  };
  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const selectedBlog = blogs.find((blog) => blog._id === id);
  // console.log(selectedBlog);

  const handleConfirmDelete = () => {
    deleteRequest(selectedBlog?._id);
    setShowComment(false);
  };

  useEffect(() => {
    getRequest("blogs");
    getRequest("users");
  }, []);

  useEffect(() => {
    if (selectedBlog) {
      putRequest("blogs", id, {
        countOfVisitors: selectedBlog.countOfVisitors + 1,
      });
    }
  }, []);
  useEffect(() => {
    const writerUser = users.find((user) => user._id === selectedBlog.userId);
    setWriter(writerUser);
  }, []);

  return (
    <Container
      sx={{
        py: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 1, md: 2 },
      }}
    >
      {/* BLOG TİTLE */}
      <Typography
        variant="h6"
        textAlign={"center"}
        color={"#723C45"}
        fontWeight={"bold"}
        textTransform={"uppercase"}
      >
        {selectedBlog?.title}
      </Typography>

      {/* BLOG İMAGE */}
      <Box
        sx={{ width: { xs: "80vw", md: "50vw" }, height: { xs: 200, md: 400 } }}
      >
        <img
          src={selectedBlog?.image}
          alt={selectedBlog?.title}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </Box>

      {/* BLOG WRİTER  */}
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

      {/* CONTENT */}
      <Typography textAlign="justify">
        <span
          style={{
            fontSize: "4rem",
            marginLeft: "3rem",
            float: "left",
            marginRight: "10px",
            lineHeight: "90%",
            textShadow: "3px 3px #C0C0C0",
            color: "#5B92A8",
          }}
        >
          {selectedBlog?.content.slice(0, 1)}
        </span>
        {selectedBlog?.content.slice(1)}
      </Typography>

      {/* ICONS */}
      <Box justifySelf="flex-start" sx={{ width: "100%" }}>
        <IconButtons
          id={id}
          likes={selectedBlog?.likes}
          countOfVisitors={selectedBlog?.countOfVisitors}
          path={"blogdetail"}
          setShowComment={setShowComment}
          comments={selectedBlog?.comments}
        />
      </Box>

      {/* COMMENTS */}
      {showComment ? (
        <>
          <ShowComment id={id} />
        </>
      ) : (
        ""
      )}
      {user._id === selectedBlog?.userId ? (
        <Box>
          <Button sx={{ color: "green" }} onClick={handleEdit}>
            Update
          </Button>
          <Button sx={{ color: "brown" }} onClick={handleDelete}>
            Delete
          </Button>
        </Box>
      ) : (
        ""
      )}
      
      {/* MODALS */}
      <DeleteBlogModal
        open={showDeleteModal}
        onClose={handleCloseDeleteModal}
        confirm={handleConfirmDelete}
        message="Are you sure you want to delete this blog?"
      />
      <EditBlogModal
        open={showEditModal}
        onClose={handleCloseEditModal}
        confirm={handleConfirmEdit}
        {...selectedBlog}
      />
    </Container>
  );
};

export default BlogDetail;
