import React from "react";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import { styled, alpha } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { Box, Stack, useTheme } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import {
  DarkModeRounded,
  LightModeOutlined,
  LogoutOutlined,
  LogoutRounded,
  NotificationsOutlined,
  NotificationsRounded,
  Person2Outlined,
  Person2Rounded,
} from "@mui/icons-material";
import { useNavigate } from "react-router";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function TopBar(props) {
  const theme = useTheme();

  const changeMode = (_) => {
    props.setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));

    if (theme.palette.mode === "dark") {
      localStorage.theme = "light";
    } else localStorage.theme = "dark";
  };

  const navigate = useNavigate();

  const handleLogout = (_) => {
    localStorage.removeItem("login");
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      open={props.open}
      sx={{ backgroundColor: theme.palette.background.mainDefault }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={props.handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(props.open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>

        <Stack
          direction={"row"}
          alignItems={"center"}
          gap={1}
          className="w-100"
        >
          <Box flexGrow={1} />

          <IconButton color="inherit" onClick={changeMode} title="تبديل الوضع">
            {theme.palette.mode === "dark" ? (
              <LightModeOutlined />
            ) : (
              <DarkModeRounded />
            )}
          </IconButton>

          <IconButton color="inherit" title="الاشعارات">
            {theme.palette.mode === "dark" ? (
              <NotificationsOutlined />
            ) : (
              <NotificationsRounded />
            )}
          </IconButton>

          <IconButton
            color="inherit"
            title="الملف الشخصي"
            onClick={() => navigate("/admin/profile")}
          >
            {theme.palette.mode === "dark" ? (
              <Person2Outlined />
            ) : (
              <Person2Rounded />
            )}
          </IconButton>

          <IconButton color="inherit" title="تسجيل خروج" onClick={handleLogout}>
            {theme.palette.mode === "dark" ? (
              <LogoutOutlined />
            ) : (
              <LogoutRounded />
            )}
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
