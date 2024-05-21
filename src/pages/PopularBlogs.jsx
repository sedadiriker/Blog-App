import { Box, Typography } from "@mui/material";
import MostCommentedBlogs from "../components/MostCommentedBlogs";

const PopularBlogs = () => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      py={2}
      minHeight={"79vh"}
    >
      <Typography
        pt={5}
        textAlign={"center"}
        variant="h6"
        color={"brown"}
        textTransform={"uppercase"}
        fontWeight={"bold"}
        sx={{
          bgcolor: "#FFE2A880",
          borderTopRightRadius: "10px",
          borderBottomLeftRadius: "10px",
          width: { xs: "75vw", md: "50vw" },
          py: 1,
          letterSpacing: ".3rem",
        }}
      >
        Popular Blogs
      </Typography>
      <MostCommentedBlogs />
    </Box>
  );
};

export default PopularBlogs;
