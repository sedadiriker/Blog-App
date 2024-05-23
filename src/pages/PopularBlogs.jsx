import { Box } from "@mui/material";
import MostCommentedBlogs from "../components/MostCommentedBlogs";
import PageName from "../components/PageName";
import { BoxContainer } from "../styles/globalStyles";

const PopularBlogs = () => {
  return (
    <Box sx={BoxContainer}>
      <PageName title={"Popular Blogs"} />
      <MostCommentedBlogs />
    </Box>
  );
};

export default PopularBlogs;
