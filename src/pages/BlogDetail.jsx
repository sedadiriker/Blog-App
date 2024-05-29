import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useBlogRequest from "../hooks/useBlogRequest";
import EditBlogModal from "../components/Modals/EditBlogModal";
import ShowComment from "../components/ShowComment";
import IconButtons from "../components/IconButtons";
import DeleteModal from "../components/Modals/DeleteModal";
import Loading from "../components/Loading";

const BlogDetail = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [writer, setWriter] = useState(null);
  const [showComment, setShowComment] = useState(false);
  const [loading, setLoading] = useState(true);

  const { users, blog, like } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.auth);
  const { getRequest, deleteRequest, getBlog } = useBlogRequest();
  const { id } = useParams();

  //? Modal ile editleme ve silme işlemleri
  const handleDelete = () => {
    setShowDeleteModal(true);
  };
  const handleEdit = () => {
    setShowEditModal(true);
  };
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };
  const handleConfirmEdit = () => {
    setShowComment(false);
  };
  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleConfirmDelete = () => {
    deleteRequest("blogs", blog?._id);
    setShowComment(false);
  };

  useEffect(() => {
    getRequest("users");
    getBlog(id);
  }, []);

  useEffect(() => {
    const writerUser = users.find((user) => user._id === blog?.userId?._id);
    console.log("writteruser", writerUser);
    setWriter(writerUser);
    // admin token ile bütün kullanıcıları aldıktan sonra blog yazarını bulabiliyoruz. dependency kısmına users yazmayınca farklı yazarların blogları arasında gezince sayfayı yenilemezsek writer güncellenmiyor.
  }, [users]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  console.log("detail", user._id);
  console.log("detail2", blog?.userId?._id);
  console.log("users", users);
  console.log(blog);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Container
          sx={{
            py: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: { xs: 1, md: 2 },
          }}
        >
          {/* BLOG TİTLE */}
          <Typography
            variant="h6"
            textAlign={"center"}
            color={"#723C45"}
            fontWeight={"bold"}
            textTransform={"uppercase"}
          >
            {blog?.title}
          </Typography>

          {/* BLOG İMAGE */}
          <Box
            sx={{
              width: { xs: "80vw", md: "50vw" },
              height: { xs: 200, md: 400 },
            }}
          >
            <img
              src={blog?.image}
              alt={blog?.title}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </Box>

          {/* BLOG WRİTER  */}
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={3}
            sx={{ width: { xs: "80vw", md: "50vw" } }}
          >
            <Avatar
              alt={writer?.username}
              src="/"
              sx={{ backgroundColor: "#C96F1F70", color: "#5B92A8" }}
            />
            <Box>
              {writer?.username ? (
                <Typography
                  fontWeight={"bold"}
                  textTransform={"uppercase"}
                  color={"#5B92A8"}
                >
                  {writer?.username}
                </Typography>
              ) : (
                <Typography
                  fontWeight={"bold"}
                  textTransform={"uppercase"}
                  color="#5B92A8"
                >
                  Clarusway
                </Typography>
              )}
              <Typography fontSize={"12px"} color="gray">
                {new Date(blog?.createdAt).toLocaleString("tr-TR")}
              </Typography>
            </Box>
          </Box>

          {/* CONTENT */}
          <Typography textAlign="justify">
            <span
              style={{
                fontSize: "4rem",
                marginLeft: "3rem",
                float: "left",
                marginRight: "10px",
                lineHeight: "90%",
                textShadow: "3px 3px #C0C0C0",
                color: "#5B92A8",
              }}
            >
              {blog?.content?.slice(0, 1)}
            </span>
            {blog?.content?.slice(1)}
          </Typography>

          {/* ICONS */}
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            sx={{ width: "100%" }}
          >
            <Box>
              <IconButtons
                id={id}
                likes={blog?.likes.length}
                countOfVisitors={blog?.countOfVisitors}
                path={"blogdetail"}
                setShowComment={setShowComment}
                comments={blog?.comments}
                didUserLike={
                  like?.blogId === id
                    ? like?.data?.didUserLike
                    : blog?.likes.some((item) => item === user?._id)
                }
              />
            </Box>
            {user._id === blog?.userId?._id ? (
              <Box>
                <Button sx={{ color: "green" }} onClick={handleEdit}>
                  Update
                </Button>
                <Button sx={{ color: "brown" }} onClick={handleDelete}>
                  Delete
                </Button>
              </Box>
            ) : (
              ""
            )}
            {/*userId içindeki _id'ye bakmamız lazım. 
               update-delete butonlarını yorumların üstüne alıp, diğer iconlarla aynı box'ın içinde sağa sola yasladım. */}
          </Box>

          {/* COMMENTS */}
          {showComment ? (
            <>
              <ShowComment blog={blog} />
            </>
          ) : (
            ""
          )}

          {/* MODALS */}
          <DeleteModal
            open={showDeleteModal}
            onClose={handleCloseDeleteModal}
            confirm={handleConfirmDelete}
            message="Are you sure you want to delete this blog?"
          />
          <EditBlogModal
            open={showEditModal}
            onClose={handleCloseEditModal}
            confirm={handleConfirmEdit}
            {...blog}
          />
        </Container>
      )}
    </>
  );
};

export default BlogDetail;
