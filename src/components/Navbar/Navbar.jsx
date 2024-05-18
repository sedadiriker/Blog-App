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
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          
          {/* MENU */}
          <Box sx={{ flexGrow: 1 }}>
            <Box>
              <MenuIcon
                onClick={toggleDrawer(true)}
                sx={{ color: "white", cursor: "pointer" }}
              />
            </Box>
            <Drawer open={open} onClose={toggleDrawer(false)}>
              <DrawerList toggleDrawer={toggleDrawer} />
            </Drawer>
          </Box>

          {/* LOGO */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: "flex",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              flexGrow: 1,
            }}
          >
            BLOGEST
          </Typography>

          {/* USER MENU */}
          <UserMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
