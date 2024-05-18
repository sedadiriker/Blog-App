import { Box, Typography } from "@mui/material";
import MostCommentedBlogs from "../components/MostCommentedBlogs";
const PopularBlogs = () => {
  return (
    <Box display={"fleax"}  flexDirection={"column"} alignItems={"center"}>
      <Typography variant="h4">Popular Blogs</Typography>
      <MostCommentedBlogs/>
    </Box>
  )
}

export default PopularBlogs
