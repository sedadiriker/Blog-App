import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import useAuthRequest from "../../hooks/useAuthRequest";
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { user } = useSelector((state) => state.auth);
  const { logout } = useAuthRequest();
  const navigate = useNavigate()

  const settings = ["My Blog", "Profile", "Logout"];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          {user?.image ? (
            <Avatar alt={user?.username} src={user.image} />
          ) : (
            <Avatar
              sx={{
                backgroundColor: "#FFE2A8",
                color: "#5B92A8",
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
              alt={user?.username}
              src="/"
            />
          )}
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) =>
          setting === "Logout" ? (
            <MenuItem
              key={setting}
              onClick={() => {
                handleCloseUserMenu();
                logout();
              }}
            >
              <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
          ) : setting === "Profile" ? (
            <MenuItem key={setting} onClick={()=>{
              handleCloseUserMenu()
              navigate("/userprofile")
            }}>
              <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
          ) : (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
          )
        )}
      </Menu>
    </Box>
  );
};

export default UserMenu;
