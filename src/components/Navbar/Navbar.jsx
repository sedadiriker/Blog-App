import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import DrawerList from "./DrawerList";
import UserMenu from "./UserMenu";
import { useState } from "react";

function ResponsiveAppBar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#A6471490",py:2}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* MENU */}
          <Box sx={{ flexGrow: 1 }}>
            <Box>
              <MenuIcon
                onClick={toggleDrawer(true)}
                sx={{ color: "#FFE2A8", cursor: "pointer" }}
              />
            </Box>
            <Drawer open={open} onClose={toggleDrawer(false)} sx={{
              "& .MuiDrawer-paper": {
                backgroundColor:"#7597A3"
              }
            }}>
              <DrawerList toggleDrawer={toggleDrawer}/>
            </Drawer>
          </Box>

          {/* LOGO */}
          <img src="/images/Logo.png" alt="Logo" style={{ marginRight: "8px", width:"50px",boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.5)" }} />
          <Typography
            variant="h5"
            noWrap
            fontWeight={"bold"}
            sx={{
              mr: 2,
              display: "flex",
              fontFamily: "monospace",
              letterSpacing: ".3rem",
              color: "#FFE2A8",
              textDecoration: "none",
              flexGrow: 1,
              textShadow:"1px 2px 5px black"
            }}
          >
            LOGEST
          </Typography>

          {/* USER MENU */}
          <UserMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
