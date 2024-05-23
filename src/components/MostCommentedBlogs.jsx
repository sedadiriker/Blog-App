import { Box, Typography, Button, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useBlogRequest from "../hooks/useBlogRequest";
import SwipeableViews from "react-swipeable-views";
import BlogCard from "./BlogCard";
import { GreenBtn } from "../styles/globalStyles";

const MostCommentedBlogs = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { blogs } = useSelector((state) => state.blog);
  const { getRequest } = useBlogRequest();
  const theme = useTheme(); //!bileşen temasına erişim sağlama

  const mostCommentedBlogs = blogs
    .slice()
    .sort((a, b) => b.comments.length - a.comments.length)
    .slice(0, 8);

  // console.log("most",mostCommentedBlogs)

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  useEffect(() => {
    getRequest("blogs");
  }, []);
  return (
    <Box sx={{ maxWidth: 1200, margin: "auto" }}>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {mostCommentedBlogs.map((blog, index) => (
          <Box key={index}>
            {Math.abs(activeStep - index) <= 0 ? ( //abs mutlak değeri döndürür!!
              <Grid container spacing={2}>
                {mostCommentedBlogs.slice(index, index + 2).map((blog, i) => (
                  <Grid key={i} item xs={12} md={6}>
                    <Box p={2}>
                      <BlogCard {...blog} />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            ) : null}
          </Box>
        ))}
      </SwipeableViews>
      <Box display={"flex"} justifyContent={"center"}>
        <Button
          disabled={activeStep === 0}
          onClick={() => handleStepChange(activeStep - 1)}
          sx={GreenBtn}
        >
          Back
        </Button>
        <Button
          disabled={activeStep >= mostCommentedBlogs.length - 4}
          onClick={() => handleStepChange(activeStep + 1)}
          sx={GreenBtn}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default MostCommentedBlogs;
