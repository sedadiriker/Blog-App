import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import LoginForm from "../../components/auth/LoginForm";


const Login = () => {

  return (
    <Box
      height={"100vh"}
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
      <Container sx={{ display: "flex", flexDirection: "column", gap: "5rem" }}>
        <Typography
          textAlign={"center"}
          color={"white"}
          fontWeight={"bold"}
          sx={{
            fontSize: { xs: "2rem", md: "3rem" },
            WebkitTextStroke: "1px #1876D1",
          }}
        >
          login
        </Typography>

        <LoginForm/>
      </Container>
    </Box>
  );
};

export default Login;
