import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import { useNavigate } from "react-router-dom";
import useBlogRequest from "../hooks/useBlogRequest";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const IconButtons = ({
  id,
  likes = [],
  countOfVisitors,
  path,
  setShowComment,
  comments = [],
  liked,
  likeCount,
  onLike,
}) => {
  const navigate = useNavigate();
  const { postLike } = useBlogRequest();
  const { blog } = useSelector((state) => state.blog);

  const likeColor = liked ? "#A73159" : "#A7315950";

  const handleLike = async () => {
    await postLike(id);
    onLike();
  };

  return (
    <>
      <IconButton
        aria-label="add to favorites"
        sx={{ fontSize: "1rem" }}
        onClick={handleLike}
      >
        {likeCount} <FavoriteIcon sx={{ color: likeColor }} />
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
        {path === "blogdetail" ? blog?.comments?.length : comments.length}{" "}
        <InsertCommentIcon sx={{ color: "#C96F1F" }} />
      </IconButton>
      <IconButton aria-label="follow" sx={{ fontSize: "1rem" }}>
        {countOfVisitors} <VisibilityIcon sx={{ color: "#385E40" }} />
      </IconButton>
    </>
  );
};

export default IconButtons;
