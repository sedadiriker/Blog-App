import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FeedIcon from '@mui/icons-material/Feed';
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import StarIcon from "@mui/icons-material/Star";
import CategoryIcon from "@mui/icons-material/Category";
import { Box, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import useBlogRequest from "../../hooks/useBlogRequest";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DrawerList = ({ toggleDrawer }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { getRequest } = useBlogRequest();
  const { categories } = useSelector((state) => state.blog);
  console.log(categories);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const pages = [
    { page: "Home", icon: <HomeIcon />, path: "/" },
    { page: "Categories", icon: <CategoryIcon />, path: "/categories" },
    { page: "Popular Blogs", icon: <StarIcon />, path: "/popularblogs" },
    { page: "Latest Blogs", icon: <FeedIcon />, path: "/latestblogs" },
    { page: "About", icon: <InfoIcon />, path: "/about" },
    { page: "Contact", icon: <ContactMailIcon />, path: "/contact" },
  ];

  useEffect(() => {
    getRequest("categories");
  }, []);
  return (
    <Box sx={{ width: 250, pt: 20 }} role="presentation">
      <List>
        {pages.map(({ page, icon, path }) => (
          <ListItem key={page} disablePadding>
            {page === "Categories" ? (
              <>
                <ListItemButton
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={page} />
                </ListItemButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  {categories?.map((category) => (
                    <MenuItem onClick={handleClose}>{category.name}</MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <Link to={path} style={{textDecoration:"none", color:"black",width:"100%"}}>
                <ListItemButton onClick={toggleDrawer(false)}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={page} />
                </ListItemButton>
              </Link>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default DrawerList;
