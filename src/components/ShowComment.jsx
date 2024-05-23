import {
  Avatar,
  Box,
  Button,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useBlogRequest from "../hooks/useBlogRequest";

const ShowComment = ({ id }) => {
  const { getRequest, addRequest } = useBlogRequest();
  const { comments } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.auth);

  const selectComments = comments.filter((comment) => comment?.blogId === id);

  useEffect(() => {
    getRequest("comments", 1000000);
  }, []);
  // console.log("select",selectComments)
  // console.log("comments",comments)
  return (
    <>
      {/* COMMENT FORM */}
      <Box width={"100%"}>
        <Formik
          initialValues={{
            comment: "",
          }}
          onSubmit={(values, actions) => {
            addRequest("comments", {
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

      {/* COMMENTS */}
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
  );
};

export default ShowComment;
