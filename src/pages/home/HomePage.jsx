import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import TopBar from "../../utilities/TopBar/TopBar";
import SideBar from "../../utilities/Drawer/SideBar";
import { Outlet, useNavigate } from "react-router";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

function HomePage(props) {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!localStorage.login) {
      navigate("/login");
    }
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <TopBar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        setMode={props.setMode}
        mode={props.mode}
      />

      <SideBar open={open} handleDrawerClose={handleDrawerClose} />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}

export default HomePage;
