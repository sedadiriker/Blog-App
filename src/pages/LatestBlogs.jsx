import { Box, CardMedia, Grid, Paper, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import useBlogRequest from "../hooks/useBlogRequest";

const LatestBlogs = () => {
    const {blogs} = useSelector(state => state.blog)
    const{getRequest}=useBlogRequest()

    const latestBlogs = blogs.slice(-8)
    console.log(latestBlogs)

    useEffect(()=>{
        getRequest("blogs")
    },[])

  return (
    <Box display={"flex"}  flexDirection={"column"} alignItems={"center"}>
      <Typography variant="h4">Latest Blogs</Typography>
      <Box py={5} px={10}>
      <Grid container spacing={2}>
  {latestBlogs.slice(0, 1).map((blog, index) => (
    <Grid key={index} item xs={12}>
      <Paper
        sx={{
          cursor: "pointer",
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

  {latestBlogs.slice(1, 4).map((blog, index) => (
    <Grid key={index} item xs={4}>
      <Paper
        sx={{
          cursor: "pointer",
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

  {latestBlogs.slice(4, 6).map((blog, index) => (
    <Grid key={index} item xs={6}>
      <Paper
        sx={{
          cursor: "pointer",
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

  {latestBlogs.slice(6, 8).map((blog, index) => (
    <Grid key={index} item xs={6}>
      <Paper
        sx={{
          cursor: "pointer",
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
    </Box>
  )
}

export default LatestBlogs
