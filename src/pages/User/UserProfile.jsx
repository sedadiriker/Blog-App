import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import useAuthRequest from "../../hooks/useAuthRequest";

const UserProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const { user } = useSelector((state) => state.auth);
  const { updateUser } = useAuthRequest();
  const { image, username, firstName, lastName, email, city, bio, _id } = user;
  // console.log(user)
  // console.log(editedUser)

  const handleEdit = () => {
    setEditedUser({ username, firstName, lastName, email, city, bio });
    setEditMode(true);
  };

  const handleSaveEdit = () => {
    setEditMode(false);
    updateUser(_id, editedUser);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target);
    setEditedUser({ ...editedUser, [name]: value });
  };

  const userInfo = [
    { label: "Username", value: username, name: "username" },
    { label: "First Name", value: firstName, name: "firstName" },
    { label: "Last Name", value: lastName, name: "lastName" },
    { label: "E-mail", value: email, name: "email" },
    { label: "City", value: city, name: "city" },
    { label: "Bio", value: bio, name: "bio" },
  ];

  return (
    <Container sx={{ py: 4 }}>
      <Box
        sx={{
          maxWidth: 500,
          margin: "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {image ? (
          <img style={{ width: "50%" }} src={image} alt={username} />
        ) : (
          <img style={{ width: "50%" }} src="images/blog.png" alt={username} />
        )}
      </Box>
      {userInfo.map(({ label, value, name }) => (
        <Box sx={{ maxWidth: 500, margin: "auto", pt: 2 }} key={name}>
          <Typography sx={{color:"#A7C0DD"}} textTransform={"uppercase"} fontWeight={"bold"}>{label}</Typography>
          {editMode ? (
            <TextField
              fullWidth
              name={name}
              value={editedUser[name] || ""}
              onChange={handleChange}
              sx={{ mt: 1}}
              
            />
          ) : (
            <TextField
              fullWidth
              value={value}
              InputProps={{
                readOnly: true,
                style:{color:"gray"}
              }}
              sx={{ mt: 1,bgcolor: '#FFE5AE40'  }}
             
            />
          )}
        </Box>
      ))}
      <Box
        sx={{
          maxWidth: 500,
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          pt: 2,
        }}
      >
        {editMode ? (
          <Button onClick={handleSaveEdit} sx={{ color: "green" }}>
            Save Edit
          </Button>
        ) : (
          <Button onClick={handleEdit} sx={{ color: "green" }}>
            Edit Profile
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default UserProfile;
