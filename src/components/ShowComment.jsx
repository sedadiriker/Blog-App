import {
  Avatar,
  Box,
  Button,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useBlogRequest from "../hooks/useBlogRequest";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteModal from "./Modals/DeleteModal";

const ShowComment = ({ id, setComments, selectedBlogComments,addComment }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { getRequest, addRequest, deleteRequest } = useBlogRequest();
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { comments } = useSelector((state) => state.blog);
  const [filteredComments, setFilteredComments] = useState([]);

  // const filteredComments = comments.filter((comment) =>
  //   selectedBlogComments.includes(comment._id)
  // );
  console.log("comments",comments)
  console.log("selected", selectedBlogComments);
  console.log("filter", filteredComments);
  console.log(selectedCommentId)
  const handleDelete = () => {
    setShowDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };
  const handleConfirmDelete = () => {
    deleteRequest("comments", selectedCommentId);
    setShowDeleteModal(false);
    setComments(filteredComments.filter(comment => comment._id !==selectedCommentId))
  };

  useEffect(() => {
    getRequest("comments", 1000000);
  }, []);

  useEffect(() => {
    setFilteredComments(comments.filter((comment) =>
      selectedBlogComments.includes(comment._id)
    ));
  }, [comments, selectedBlogComments]);
  
  return (
    <>
      {/* COMMENT FORM */}
      <Box width={"100%"}>
        <Formik
          initialValues={{
            comment: "",
          }}
          onSubmit={async (values, actions) => {
           const newComment = {
              blogId: id,
              comment: values.comment,
              userId: user,
            };
            await addRequest("comments", newComment);
            setComments((prevComments) => [...prevComments, newComment]);
            setFilteredComments((prevFilteredComments) => [...prevFilteredComments, newComment]);
            addComment(newComment)
            console.log(selectedBlogComments)
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

      {/* COMMENTS */}
      <Box width={"100%"} pt={4}>
        {filteredComments.map((comment) => (
          <Box display={"flex"} key={comment?._id}>
            <Box pb={2} width={"100%"}>
              <Box
                display={"flex"}
                alignItems={"flex-start"}
                pl={7}
                gap={3}
                py={1}
              >
                <Avatar
                  alt={comment?.userId?.username}
                  src=""
                  sx={{ backgroundColor: "#C96F1F70", color: "#5B92A8" }}
                />
                <Box>
                  <Typography
                    fontWeight={"bold"}
                    textTransform={"uppercase"}
                    color="#5B92A8"
                  >
                    {comment?.userId?.username}
                  </Typography>

                  <Typography fontSize={"12px"} color="gray">
                    {new Date(comment?.createdAt).toLocaleString("tr-TR")}
                  </Typography>
                </Box>
              </Box>
              <Typography
                pl={8}
                textAlign={"justify"}
                sx={{ width: { xs: "90%", md: "50%" } }}
              >
                {comment.comment}
              </Typography>
              <Divider />
            </Box>
            {comment?.userId._id === user?._id && (
              <ClearIcon
                sx={{
                  color: "brown",
                  cursor: "pointer",
                  ":hover": {
                    bgcolor: "brown",
                    color: "white",
                    borderRadius: "50%",
                  },
                }}
                onClick={() => {
                  handleDelete();
                  setSelectedCommentId(comment?._id);
                }}
              />
            )}
          </Box>
        ))}
      </Box>

      <DeleteModal
        open={showDeleteModal}
        onClose={handleCloseDeleteModal}
        confirm={handleConfirmDelete}
        message="Are you sure you want to delete this comment?"
      />
    </>
  );
};

export default ShowComment;
