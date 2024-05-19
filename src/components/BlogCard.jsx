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

 
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card sx={{ width:{xs:320, md:550}, margin: "auto", border:"1px solid #46718250", boxShadow:"5px -5px 15px gray" }}>
      <CardHeader
      sx={{height:90, position:"relative"}}
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
        title={
          <Box sx={{ fontSize: "1.2rem", fontWeight: "bold", color: "#723C46" }}>
            {title}
          </Box>
        }
        subheader={
          <Box sx={{ fontSize: "14px", color: "green",position:"absolute", bottom:0, right:10 }}>
            {new Date(createdAt).toLocaleString("tr-TR")}
          </Box>
        }
      />
      <CardMedia component="img" image={image} alt="Paella dish" sx={{height:{xs:100, md:250}, px:1, objectFit:"cover"}} />
      <CardContent sx={{height:{xs:200,md:150}, textAlign:"justify"}}>
        <Typography variant="body2" color="text.secondary">
          {`${content}`.slice(0, 300) + "..."}
        </Typography>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{ display: "flex", justifyContent: "space-between" , height:{xs:50,md:50}}}
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
