import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {  Formik } from "formik";
import { } from "react-router-dom";
import RegisterForm, { registerSchema } from "../../components/auth/RegisterForm";
import useAuthRequest from "../../hooks/useAuthRequest";

const Register = () => {
  const { register } = useAuthRequest();

  return (
    <Box
      minHeight={"100vh"}
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py:3
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "url('images/login/background.jpg')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          filter: "blur(3px)",
          zIndex: -1,
        }}
      />
      <Container sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <Typography
          textAlign={"center"}
          color={"#A5292A80"}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          sx={{
            fontSize: { xs: "2rem", md: "2.2rem" },
          }}
        >
         register
        </Typography>

        <Formik
          initialValues={{
            username: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            image: "",
            city: "",
            bio: ""
          }}
          validationSchema={registerSchema}
          onSubmit={(values, actions) => {
            console.log("Register", values);
            register(values);
            actions.resetForm();
            actions.setSubmitting(false);
          }}
          component={(props) => <RegisterForm {...props}/>}
        ></Formik>
      </Container>
    </Box>
  );
};

export default Register;
