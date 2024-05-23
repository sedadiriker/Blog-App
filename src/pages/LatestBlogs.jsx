import { Box, CardMedia, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useBlogRequest from "../hooks/useBlogRequest";
import { useNavigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import PageName from "../components/PageName";

const LatestBlogs = () => {
  const { blogs, loading } = useSelector((state) => state.blog);
  const { getRequest } = useBlogRequest();
  const navigate = useNavigate();

  useEffect(() => {
    getRequest("blogs");
  }, []);

  const latestBlogs = blogs.slice(-8);

  return loading ? (
    <Box sx={{ width: "100%" }}>
      <LinearProgress sx={{ bgcolor: "#5B92A8" }} />
    </Box>
  ) : (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight={"79vh"}
      py={2}
    >
      <PageName title={"Latest Blogs"}/>

      {/* BLOG CARD */}
      <Box py={5} sx={{ px: { xs: 5, md: 10 } }}>
        <Grid container spacing={5}>
          {latestBlogs.map((blog, index) => (
            <Grid
              key={index}
              item
              xs={12}
              sm={index === 0 ? 9 : index < 4 ? 4 : 6}
              md={index === 0 ? 9 : index < 4 ? 4 : 6}
              sx={{
                margin: "auto",
                height:
                  index === 0
                    ? { xs: 250, sm: 350, md: 500 }
                    : index < 4
                    ? { xs: 250, md: 300 }
                    : { xs: 250, md: 450 },
              }}
            >
              <Paper
                sx={{
                  boxShadow: "5px 3px 20px gray",
                  cursor: "pointer",
                  height: "100%",
                  position: "relative",
                  ":hover .title": {
                    bottom: "40px",
                    width: "100%",
                    backgroundColor: "#5B92A8",
                    fontSize: { xs: "8px", md: "1rem" },
                  },
                }}
                onClick={() => navigate(`/blogdetail/${blog._id}`)}
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
                    overflow: "hidden",
                    textAlign: "center",
                    transform: "translateX(-50%)",
                    backgroundColor: "#5B92A870",
                    color: "white",
                    padding: "8px",
                    whiteSpace: "nowrap",
                    transition: "all 1s ease-in",
                    fontSize: { xs: "6px", md: "12px" },
                    whiteSpace: "normal",
                  }}
                >
                  {blog.title}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default LatestBlogs;
