import React from "react";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { Badge, Box, Paper, Stack, useTheme } from "@mui/material";
import {
  DarkModeRounded,
  LightModeOutlined,
  LogoutOutlined,
  LogoutRounded,
  NotificationImportantRounded,
  NotificationsOutlined,
  NotificationsRounded,
  Person2Outlined,
  Person2Rounded,
} from "@mui/icons-material";
import { useNavigate } from "react-router";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { getAllNoti, getAllProfileDetails } from "../../Redux/actions/Actions";
import axios from "axios";
import "./TopBar.css";

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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notificationsId, setNotificationsId] = React.useState([]);
  const teacherDetails = useSelector((state) => state.PROFILEDETAILS.profile);
  const allNotifications = useSelector(
    (state) => state.NOTIFICATIONS.notifications
  );

  const dispatch = useDispatch();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    let token = localStorage.login;

    dispatch(getAllProfileDetails(token));
  }, []);

  React.useEffect(() => {
    if (allNotifications?.length > 0) {
      setNotificationsId(allNotifications?.map((item) => item.id));
    }
  }, [allNotifications]);

  React.useEffect(() => {
    if (Object.keys(teacherDetails).length > 0) {
      dispatch(getAllNoti(teacherDetails.id));
    }
  }, [teacherDetails]);

  const handleReadNotification = async (id, type, readAll) => {
    handleClose();

    if (readAll) {
      try {
        for (let i = 0; i < notificationsId.length; i++) {
          await axios.patch(
            `${import.meta.env.VITE_API}notifications/${notificationsId[i]}`
          );

          dispatch(getAllNoti(teacherDetails.id));
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        await axios.patch(`${import.meta.env.VITE_API}notifications/${id}`);

        if (type === "register" || type === "verification") {
          navigate("/admin/students-management");
        } else if (
          type === "exam_submission" ||
          type === "homework_submission"
        ) {
          navigate("/admin/homework-management");
        }

        dispatch(getAllNoti(teacherDetails.id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <AppBar
      position="fixed"
      open={props.open}
      sx={{ backgroundColor: theme.palette.background.mainDefault }}
      className="top-bar"
    >
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{
          sx: {
            width: 400 + "px",
            padding: 10 + "px",
            height: "auto",
            maxHeight: 320 + "px",
            overflowY: "auto",
          },
        }}
      >
        <div>
          {allNotifications?.length > 0 ? (
            <span className="p-4 user-select-none">
              <NotificationImportantRounded /> جميع الاشعارات الغير مقروءة
            </span>
          ) : (
            <span className="text-center w-100 d-block fw-bold">
              لا توجد اشعارات غير مقروءة
            </span>
          )}
        </div>

        {allNotifications?.length > 0 && (
          <Stack direction={"row"} gap={1} justifyContent={"flex-end"}>
            <span
              className="read-all"
              onClick={(_) => handleReadNotification("", "", true)}
            >
              قراءة الكل
            </span>
          </Stack>
        )}

        <Stack gap={1} mt={2}>
          {allNotifications?.length > 0 &&
            allNotifications?.map((notification, index) => {
              return (
                <Paper key={index} className="rounded">
                  <MenuItem
                    onClick={(_) =>
                      handleReadNotification(
                        notification.id,
                        notification.notificationType,
                        false
                      )
                    }
                    className="rounded"
                  >
                    <Stack gap={2} overflow={"hidden"}>
                      <span className="user-select-none fs-6">
                        {notification.title}
                      </span>

                      <div>
                        <span>{notification.message}</span>
                      </div>
                    </Stack>
                  </MenuItem>
                </Paper>
              );
            })}
        </Stack>
      </Menu>

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

          <IconButton
            color="inherit"
            title="الاشعارات"
            onClick={handleClick}
            className="position-relative"
          >
            <Badge color="error" badgeContent={allNotifications.length}>
              {theme.palette.mode === "dark" ? (
                <NotificationsOutlined />
              ) : (
                <NotificationsRounded />
              )}
            </Badge>
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
