import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Skeleton } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ShareBlog from "./ShareBlog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import IconButtons from "./IconButtons";

export default function BlogCard({
  title,
  content,
  image,
  likes,
  comments,
  countOfVisitors,
  _id,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.blog);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
// console.log("blogCard",_id)
// console.log("blogcard",comments)
  return (
    <Card
    // onClick={(e) => setId(_id)}
      sx={{
        width: { xs: 320, md: 550 },
        margin: "auto",
        boxShadow: "none",
        ":hover": { boxShadow: "1px 2px 25px gray" },
        ":hover .card-image": {
          transform: "scale(1.02)",
        },
        overflow: "hidden",
        backgroundColor: "#E6DAD570",
      }}
    >
      <CardHeader
        sx={{ height: 90, position: "relative" }}
        action={
          loading ? null : (
            <>
              <IconButton
                aria-label="settings"
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>
                  <ShareBlog title={title} content={content} image={image} />
                </MenuItem>
              </Menu>
            </>
          )
        }
        title={
          loading ? (
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          ) : (
            <Box
              sx={{
                fontSize: "1rem",
                fontWeight: "bold",
                color: "#723C46",
                textTransform: "uppercase",
              }}
            >
              {title}
            </Box>
          )
        }
      />
      {loading ? (
        <Skeleton
          sx={{ height: { xs: 100, md: 250 } }}
          animation="wave"
          variant="rectangular"
        />
      ) : (
        <CardMedia
          className="card-image"
          component="img"
          image={image}
          alt="Paella dish"
          sx={{
            height: { xs: 100, md: 250 },
            px: 1,
            objectFit: "cover",
            transition: "all 1s ease-in",
          }}
        />
      )}
      <CardContent sx={{ height: { xs: 200, md: 150 }, textAlign: "justify" }}>
        {loading ? (
          <>
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </>
        ) : (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: "1.3rem" }}
          >
            {`${content}`.slice(0, 300) + "..."}
          </Typography>
        )}
      </CardContent>
      <CardActions
        disableSpacing
        sx={{
          display: "flex",
          justifyContent: "space-between",
          height: { xs: 50, md: 50 },
        }}
      >
        {loading ? (
          <>
            <Skeleton
              animation="wave"
              height={10}
              width="30%"
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation="wave"
              height={40}
              width="20%"
              style={{ marginBottom: 6 }}
            />
          </>
        ) : (
          <>
            <Box>
              <IconButtons
                id={_id}
                likes={likes}
                countOfVisitors={countOfVisitors}
                comments={comments}
              />
            </Box>
            <Button
              sx={{
                color: "#344A58",
                backgroundColor: "#E4D8BA",
                ":hover": { backgroundColor: "#76815B", color: "white" },
              }}
              onClick={() => navigate(`/blogdetail/${_id}`)}
            >
              Read More
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
}
