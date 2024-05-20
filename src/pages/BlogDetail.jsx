import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useBlogRequest from "../hooks/useBlogRequest";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import { Form, Formik } from "formik";
import { object, string } from "yup";
import ConfirmModal from "../components/ConfirmModal";
const BlogDetail = () => {
  const commentSchema = object({
    comment: string().required("Comment is required"),
  });
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [writer, setWriter] = useState(null);
  const [showComment, setShowComment] = useState(false);
  const { blogs, users, comments } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.auth);
  const { getRequest, putRequest, addComment, postLike, deleteRequest } =
    useBlogRequest();
  const { id } = useParams();

  const selectedBlog = blogs.find((blog) => blog._id === id);
  const selectComments = comments.filter((comment) => comment?.blogId === id);
  console.log(selectedBlog);

  const handleConfirmDelete = () => {
    deleteRequest(selectedBlog?._id)
    setShowComment(false);
  };
  useEffect(() => {
    getRequest("blogs");
    getRequest("users");
    getRequest("comments", 1000000);
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

  //  console.log("select",selectComments)
  //  console.log("comments",comments)
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
      {" "}
      <Typography
        variant="h6"
        textAlign={"center"}
        color={"#723C45"}
        fontWeight={"bold"}
        textTransform={"uppercase"}
      >
        {selectedBlog?.title}
      </Typography>
      <Box
        sx={{ width: { xs: "80vw", md: "50vw" }, height: { xs: 200, md: 400 } }}
      >
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
            color: "#5B92A8",
          }}
        >
          {selectedBlog?.content.slice(0, 1)}
        </span>
        {selectedBlog?.content.slice(1)}
      </Typography>
      <Box justifySelf="flex-start" sx={{ width: "100%" }}>
        <IconButton
          aria-label="add to favorites"
          sx={{ fontSize: "1rem" }}
          onClick={() => postLike(id)}
        >
          {selectedBlog?.likes.length}{" "}
          <FavoriteIcon sx={{ color: "#A73159" }} />
        </IconButton>
        <IconButton
          aria-label="comment"
          sx={{ fontSize: "1rem" }}
          onClick={() => setShowComment(!showComment)}
        >
          {selectedBlog?.comments.length}{" "}
          <InsertCommentIcon sx={{ color: "#C96F1F" }} />
        </IconButton>
        <IconButton aria-label="follow" sx={{ fontSize: "1rem" }}>
          {selectedBlog?.countOfVisitors}{" "}
          <VisibilityIcon sx={{ color: "#385E40" }} />
        </IconButton>
      </Box>
      {showComment ? (
        <>
          <Box width={"100%"}>
            <Formik
              initialValues={{
                comment: "",
              }}
              validationSchema={commentSchema}
              onSubmit={(values, actions) => {
                addComment({
                  blogId: id,
                  comment: values.comment,
                  userId: user,
                });
                actions.resetForm();
                actions.setSubmitting(false);
                console.log("values", values);
              }}
            >
              {({
                values,
                handleChange,
                handleBlur,
                touched,
                errors,
                isSubmitting,
              }) => (
                <Form>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      backgroundColor: "#5B92A870",
                      py: "3rem",
                      px: "1.5rem",
                      borderRadius: "10px",
                    }}
                  >
                    <TextField
                      label="Comment *"
                      name="comment"
                      type="text"
                      multiline
                      rows={5}
                      placeholder="Add a comment"
                      InputLabelProps={{
                        shrink: true,
                        sx: {
                          color: "white",
                        },
                      }}
                      variant="outlined"
                      value={values.comment}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.content && Boolean(errors.content)}
                      helperText={touched.content && errors.content}
                      InputProps={{
                        sx: {
                          color: "white",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#37B3E2",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "brown",
                          },
                        },
                      }}
                    />

                    <Button
                      variant="contained"
                      type="submit"
                      disabled={isSubmitting}
                      sx={{
                        width: { xs: "90%", md: "30%" },
                        m: "auto",
                        backgroundColor: "#FFE2A8",
                        color: "black",
                        ":hover": { backgroundColor: "#FFE2A880" },
                      }}
                    >
                      Add Comment
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
          <Box width={"100%"} pt={4}>
            {selectComments.map(({ _id, userId, createdAt, comment }) => (
              <Box key={_id} pb={2}>
                <Box
                  display={"flex"}
                  alignItems={"flex-start"}
                  pl={7}
                  gap={3}
                  py={1}
                >
                  <Avatar
                    alt={userId.username}
                    src=""
                    sx={{ backgroundColor: "#C96F1F70", color: "#5B92A8" }}
                  />
                  <Box>
                    <Typography
                      fontWeight={"bold"}
                      textTransform={"uppercase"}
                      color="#5B92A8"
                    >
                      {userId.username}
                    </Typography>

                    <Typography fontSize={"12px"} color="gray">
                      {new Date(createdAt).toLocaleString("tr-TR")}
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  pl={8}
                  textAlign={"justify"}
                  sx={{ width: { xs: "90%", md: "50%" } }}
                >
                  {comment}
                </Typography>
                <Divider />
              </Box>
            ))}
          </Box>
        </>
      ) : (
        ""
      )}
      {user._id === selectedBlog?.userId ? (
        <Box>
          <Button sx={{ color: "green" }}>Update</Button>
          <Button sx={{ color: "brown" }} onClick={handleDelete}>
            Delete
          </Button>
        </Box>
      ) : (
        ""
      )}
      <ConfirmModal
        open={showModal}
        onClose={handleCloseModal}
        confirm={handleConfirmDelete}
        message="Are you sure you want to delete this blog?"
      />
    </Container>
  );
};

export default BlogDetail;
