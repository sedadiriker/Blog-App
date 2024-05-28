import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import LoginForm from "../../components/auth/LoginForm";

const Login = () => {
  return (
    <Box
      height={"100vh"}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <Typography
          textAlign={"center"}
          color={"#A5292A80"}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          sx={{
            fontSize: { xs: "2rem", md: "2.5rem" },
          }}
        >
          login
        </Typography>

        <LoginForm />
      </Container>
    </Box>
  );
};

export default Login;
