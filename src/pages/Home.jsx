import { useSelector } from "react-redux";
import useBlogRequest from "../hooks/useBlogRequest";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { CardMedia, Typography } from "@mui/material";

const Home = () => {
  const [randomBlogs, setRandomBlogs] = useState([]);
  const { blogs } = useSelector((state) => state.blog);
  const { getRequest } = useBlogRequest();

  const sliceBlogs = blogs.slice(0, 6);

  useEffect(() => {
    getRequest("blogs");
  }, []);

  return (
    <Box py={5} px={10}>
      <Grid container spacing={2}>
        {sliceBlogs.map((blog, index) => (
          <Grid
            key={index}
            item
            xs={index === 0 || index === 5 ? 12 : 6}
            md={index === 0 || index === 5 ? 6 : 3}
            sx={
              index === 0 || index === 5
                ? { gridRow: "span 2", gridColumn: "span 2" }
                : index === 3
                ? { gridRow: "span 2" }
                : {}
            }
          >
            <Paper
              sx={{
                cursor:"pointer",
                height: "100%",
                position: "relative",
                ":hover .title": {
                  bottom: "40px",
                  width: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                },
              }}
            >
              <CardMedia
                component="img"
                image={blog.image}
                alt={blog.title}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: 1,
                  ":hover": { opacity: 0.6 },
                  transition: "opacity 1s ease",
                }}
              />
              <Typography
                className="title"
                sx={{
                  position: "absolute",
                  bottom: "10px",
                  left: "50%",
                  width: "80%",
                  textAlign: "center",
                  transform: "translateX(-50%)",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                  padding: "8px",
                  whiteSpace: "nowrap",
                  transition: "all 1s ease-in",
                }}
              >
                {blog.title}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default Home;
