import { Box, Typography } from "@mui/material";
import MostCommentedBlogs from "../components/MostCommentedBlogs";
const PopularBlogs = () => {
  return (
    <Box display={"flex"}  flexDirection={"column"} alignItems={"center"}>
      <Typography pt={5} textAlign={'center'} variant="h6" color={"#723C45"} textTransform={'uppercase'} fontWeight={"bold"}>Popular Blogs</Typography>
      <MostCommentedBlogs/>
    </Box>
  )
}

export default PopularBlogs
