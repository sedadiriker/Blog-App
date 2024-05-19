import { Box, Typography, Button, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useBlogRequest from "../hooks/useBlogRequest";
import SwipeableViews from "react-swipeable-views";
import BlogCard from "./BlogCard";


const MostCommentedBlogs = () => {
    const {blogs} = useSelector(state => state.blog)
    const{getRequest}=useBlogRequest()
  
    const mostCommentedBlogs = blogs
    .slice()
    .sort((a,b) => b.comments.length - a.comments.length)
  
    const blogPosts = [
      { title: "Blog Post 1", content: "Content for Blog Post 1" },
      { title: "Blog Post 2", content: "Content for Blog Post 2" },
      { title: "Blog Post 3", content: "Content for Blog Post 3" },
      { title: "Blog Post 3", content: "Content for Blog Post 3" },
      { title: "Blog Post 3", content: "Content for Blog Post 3" },
      { title: "Blog Post 3", content: "Content for Blog Post 3" },
      { title: "Blog Post 3", content: "Content for Blog Post 3" },
      { title: "Blog Post 3", content: "Content for Blog Post 3" },
      { title: "Blog Post 3", content: "Content for Blog Post 3" },
      { title: "Blog Post 3", content: "Content for Blog Post 3" },
      
    ];
    const theme = useTheme(); //!bileşen temasına erişim sağlama
    const [activeStep, setActiveStep] = useState(0);
  
    const handleStepChange = (step) => {
      setActiveStep(step);
    };
    useEffect(()=>{
        getRequest("blogs")
      },[])
  return (
    <Box sx={{ maxWidth: 1200, margin: "auto" }} border={4}>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {blogs.map((post, index) => (
          <Box key={index}>
            {Math.abs(activeStep - index) <= 4 ? ( //abs mutlak değeri döndürür!!
              <Grid container spacing={2}>
                {blogs.slice(index, index + 2).map((blog, i) => (
                  <Grid key={i} item xs={12} md={6}>
                   
                    <Box p={2}>
                      <BlogCard {...blog}/>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            ) : null}
          </Box>
        ))}
      </SwipeableViews>
      <Button
        disabled={activeStep === 0}
        onClick={() => handleStepChange(activeStep - 1)}
      >
        Back
      </Button>
      <Button
        disabled={activeStep >= blogPosts.length - 4}
        onClick={() => handleStepChange(activeStep + 1)}
      >
        Next
      </Button>
    </Box>
  )
}

export default MostCommentedBlogs
