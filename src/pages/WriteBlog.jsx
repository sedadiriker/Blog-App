import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { object, string } from "yup";
import useBlogRequest from "../hooks/useBlogRequest";
import { useSelector } from "react-redux";
import PageName from "../components/PageName";
import { BoxContainer } from "../styles/globalStyles";

const WriteBlog = () => {
  const { getRequest, addRequest } = useBlogRequest();
  const { categories } = useSelector((state) => state.blog);
  const addBlogSchema = object({
    title: string().required("Title is required"),
    image: string().required("imageUrl is required"),
    content: string().required("Content is required"),
  });

  useEffect(() => {
    getRequest("categories");
  },[]);
  return (
    <Box sx={BoxContainer}>
      <PageName title={"Write a blog"} />
      {/* BLOG FORM */}
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          pt: 1,
        }}
      >
        <Container
          sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}
        >
          <Formik
            initialValues={{
              title: "",
              image: "",
              categoryId: "",
              isPublish: "",
              content: "",
            }}
            validationSchema={addBlogSchema}
            onSubmit={(values, actions) => {
              addRequest("blogs", values);
              actions.resetForm();
              actions.setSubmitting(false);
              // console.log(values)
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
                  m={"auto"}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    backgroundColor: "#5B92A890",
                    py: "3rem",
                    px: "1.5rem",
                    borderRadius: "10px",
                    width: { xs: "90vw", md: "70vw" },
                  }}
                >
                  <TextField
                    label="Title *"
                    name="title"
                    type="text"
                    InputLabelProps={{
                      shrink: true,
                      sx: {
                        color: "white",
                      },
                    }}
                    variant="outlined"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.title && Boolean(errors.title)}
                    helperText={touched.title && errors.title}
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
                  <TextField
                    label="image *"
                    name="image"
                    type="url"
                    InputLabelProps={{
                      shrink: true,
                      sx: {
                        color: "white",
                      },
                    }}
                    variant="outlined"
                    value={values.image}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.image && Boolean(errors.image)}
                    helperText={touched.image && errors.image}
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
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel sx={{ color: "white" }} id="category">
                        Category
                      </InputLabel>
                      <Select
                        labelId="category"
                        name="categoryId"
                        value={values.categoryId}
                        label="Category"
                        onChange={(e) => handleChange(e)}
                        sx={{
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
                        }}
                      >
                        {" "}
                        <MenuItem
                          onClick={() => {
                            // handleClickPath("/stock/addfirm")
                          }}
                          key={"choose"}
                          value="Please Choose"
                          disabled
                        >
                          Please Choose
                        </MenuItem>
                        <Divider />
                        {categories?.map(({ _id, name }) => (
                          <MenuItem key={_id} value={_id}>
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel sx={{ color: "white" }} id="status">
                        Status
                      </InputLabel>
                      <Select
                        labelId="status"
                        name="isPublish"
                        value={values.isPublish}
                        label="Status"
                        onChange={handleChange}
                        sx={{
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
                        }}
                      >
                        {" "}
                        <MenuItem
                          onClick={() => {
                            // handleClickPath("/stock/addbrand")
                          }}
                          key={"addbrand"}
                          value="Please Choose"
                          disabled
                        >
                          Please Choose
                        </MenuItem>
                        <Divider />
                        <MenuItem value={false}>Draft</MenuItem>
                        <MenuItem value={true}>Published</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  <TextField
                    label="Content *"
                    name="content"
                    type="text"
                    multiline
                    rows={5}
                    InputLabelProps={{
                      shrink: true,
                      sx: {
                        color: "white",
                      },
                    }}
                    variant="outlined"
                    value={values.content}
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
                    Write
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Container>
      </Box>
    </Box>
  );
};

export default WriteBlog;
