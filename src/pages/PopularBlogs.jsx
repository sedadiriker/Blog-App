import { Box } from "@mui/material";
import MostCommentedBlogs from "../components/MostCommentedBlogs";
import PageName from "../components/PageName";

const PopularBlogs = () => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      py={2}
      minHeight={"79vh"}
    >
      <PageName title={"Popular Blogs"}/>
      <MostCommentedBlogs />
    </Box>
  );
};

export default PopularBlogs;
