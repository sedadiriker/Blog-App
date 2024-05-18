import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ShareBlog from "./ShareBlog";
import { useState } from "react";


export default function BlogCard({ title, content, image, createdAt ,likes,comments,countOfVisitors}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

 
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card sx={{ maxWidth: 345, margin: "auto" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
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
                <ShareBlog title={title} content={content} image={image}/>
              </MenuItem>
            </Menu>
          </>
        }
        title={title}
        subheader={`${new Date(createdAt).toLocaleString("tr-TR")}`}
      />
      <CardMedia component="img" height="194" image={image} alt="Paella dish" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {`${content}`.slice(0, 300) + "..."}
        </Typography>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Box>
          <IconButton aria-label="add to favorites">
           {likes.length} <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="comment">
           {comments.length} <InsertCommentIcon />
          </IconButton>
          <IconButton aria-label="follow">
           {countOfVisitors} <VisibilityIcon />
          </IconButton>
        </Box>
        <Button>Read More</Button>
      </CardActions>
    </Card>
  );
}
