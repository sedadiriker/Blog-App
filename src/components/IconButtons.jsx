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
  likes=[],
  countOfVisitors,
  path,
  setShowComment,
  comments = [],
}) => {
  const navigate = useNavigate();
  const { postLike } = useBlogRequest();
  const { like } = useSelector(state => state.blog);
  const [likeCount, setLikeCount] = useState(null);
  const[didUserLike,setDidUserLike] = useState(null)
  const{user}=useSelector(state=>state.auth)
  const {blog } = useSelector((state) => state.blog);
  const likeColor = () => {
    if (didUserLike !== null) {
      return didUserLike ? "#A73159" : "#A7315950";
    }
    return likes.some((item) => item === user?._id) ? "#A73159" : "#A7315950";
  };
  
  useEffect(() => {
    like?.blogId === id &&
      setLikeCount(like?.data?.countOfLikes)
      setDidUserLike(like?.data?.didUserLike)
  }, [like,id,blog]);

// console.log("likes",likes)
// console.log(userLikes)
// console.log("button",like)

  return (
    <>
      <IconButton
        aria-label="add to favorites"
        sx={{ fontSize: "1rem" }}
        onClick={() => postLike(id)}
      >
        {likeCount!== null ? likeCount : likes?.length} <FavoriteIcon sx={{ color: likeColor() }} />

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
        {blog.comments.length} <InsertCommentIcon sx={{ color: "#C96F1F" }} />
      </IconButton>
      <IconButton aria-label="follow" sx={{ fontSize: "1rem" }}>
        {countOfVisitors} <VisibilityIcon sx={{ color: "#385E40" }} />
      </IconButton>
    </>
  );
};

export default IconButtons;
