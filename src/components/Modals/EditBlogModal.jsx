import React, { useEffect } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Divider,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Form, Formik, useFormikContext } from "formik";
import useBlogRequest from "../../hooks/useBlogRequest";

const SubmitButton = ({ onClose }) => {
  const { submitForm } = useFormikContext();

  const handleClick = async () => {
    await submitForm();
    onClose();
  };

  return (
    <Button onClick={handleClick} sx={{ color: "brown" }}>
      Yes
    </Button>
  );
};

const EditBlogModal = ({ open, onClose, confirm, title, image, categoryId, isPublish, content,_id }) => {
  const { categories } = useSelector((state) => state.blog);
  const { editRequest, getRequest } = useBlogRequest();

  useEffect(() => {
    getRequest("categories");
  }, []);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-modal-title"
      aria-describedby="confirm-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          width: 400,
        }}
      >
        <Container sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <Formik
            initialValues={{
              title,
              image,
              categoryId,
              isPublish,
              content,
            }}
            onSubmit={(values, actions) => {
              editRequest(_id, values);
              actions.resetForm();
              actions.setSubmitting(false);
              confirm(); // confirm fonksiyonunu burada çağırın
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
                    backgroundColor: "#5B92A890",
                    py: "3rem",
                    px: "1.5rem",
                    borderRadius: "10px",
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
                    label="Image *"
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
                        <MenuItem value="" disabled>
                          Please Choose
                        </MenuItem>
                        <Divider />
                        {categories.map(({ _id, name }) => (
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
                        <MenuItem value="" disabled>
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
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                  <Button onClick={onClose} sx={{ color: "green" }}>
                    No
                  </Button>
                  <SubmitButton onClose={onClose} />
                </Box>
              </Form>
            )}
          </Formik>
        </Container>
      </Box>
    </Modal>
  );
};

export default EditBlogModal;
