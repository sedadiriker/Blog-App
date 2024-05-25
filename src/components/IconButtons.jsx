import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import { useNavigate } from "react-router-dom";
import useBlogRequest from "../hooks/useBlogRequest";
import { useEffect } from "react";

const IconButtons = ({
  id,
  likes = [],
  countOfVisitors,
  path,
  setShowComment,
  comments = [],
}) => {
  const navigate = useNavigate();
  const { postLike } = useBlogRequest();
console.log("ıconcomment",comments)

useEffect(()=>{
    
})
  return (
    <>
      <IconButton
        aria-label="add to favorites"
        sx={{ fontSize: "1rem" }}
        onClick={() => postLike(id)}
      >
        {likes.length} <FavoriteIcon sx={{ color: "#A73159" }} />
      </IconButton>
      <IconButton
        aria-label="comment"
        sx={{ fontSize: "1rem" }}
        onClick={
          path === "blogdetail"
            ? () => setShowComment((prev) => !prev)
            : () => navigate(`/blogdetail/${id}`)
        }
      >
        {comments.length} <InsertCommentIcon sx={{ color: "#C96F1F" }} />
      </IconButton>
      <IconButton aria-label="follow" sx={{ fontSize: "1rem" }}>
        {countOfVisitors} <VisibilityIcon sx={{ color: "#385E40" }} />
      </IconButton>
    </>
  );
};

export default IconButtons;
