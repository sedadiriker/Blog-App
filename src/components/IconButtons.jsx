import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import { useNavigate } from "react-router-dom";
import useBlogRequest from "../hooks/useBlogRequest";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const IconButtons = ({
  id,
  likes = [],
  countOfVisitors,
  path,
  setShowComment,
  comments = [],
  didUserLike
}) => {
  const navigate = useNavigate();
  const { postLike } = useBlogRequest();
  const { like } = useSelector(state => state.blog);
  const [likeCount, setLikeCount] = useState(likes);
  const {blog } = useSelector((state) => state.blog);
  
  const likeColor = didUserLike ? "#A73159" : "#A7315950";


  useEffect(() => {
    like?.blogId === id &&
      setLikeCount(like?.data?.countOfLikes)
  }, [like,id]);
console.log("icon",likes)
  return (
    <>
      <IconButton
        aria-label="add to favorites"
        sx={{ fontSize: "1rem" }}
        onClick={() => postLike(id)}
      >
        {likeCount!== null ? likeCount : likes?.length} <FavoriteIcon sx={{ color: likeColor }} />
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
