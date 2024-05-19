import { Box, CardMedia, Grid, Paper, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import useBlogRequest from "../hooks/useBlogRequest";

const LatestBlogs = () => {
    const { blogs } = useSelector(state => state.blog)
    const { getRequest } = useBlogRequest()

    useEffect(() => {
        getRequest("blogs")
    }, [])

    const latestBlogs = blogs.slice(-8);

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Typography pt={5} textAlign={'center'} variant="h6" color={"#723C45"} textTransform={'uppercase'} fontWeight={"bold"}>Latest Blogs</Typography>
            <Box py={5} px={10}>
                <Grid container spacing={2}>
                    {latestBlogs.map((blog, index) => (
                        <Grid key={index} item xs={12} md={index === 0 ? 9 : index < 4 ? 4 : 6} sx={{margin:"auto"}}>
                            <Paper
                                sx={{
                                    cursor: "pointer",
                                    height: "100%",
                                    position: "relative",
                                    ":hover .title": {
                                        bottom: "40px",
                                        width: "100%",
                                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                                        fontSize:{xs:"8px",md:"1rem"},
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
                                        overflow:"hidden",
                                        textAlign: "center",
                                        transform: "translateX(-50%)",
                                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                                        color: "white",
                                        padding: "8px",
                                        whiteSpace: "nowrap",
                                        transition: "all 1s ease-in",
                                        fontSize:{xs:"6px", md:"12px"},
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

export default LatestBlogs;
