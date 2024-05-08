import React, { useState } from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import { Avatar, Stack } from "@mui/material";
import { list1, list2, list3, list4 } from "./List";
import { useNavigate } from "react-router";
import { grey } from "@mui/material/colors";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllProfileDetails } from "../../Redux/actions/Actions";

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const drawerWidth = 240;

function SideBar(props) {
  const theme = useTheme();
  const [profileDetails, setProfileDetails] = useState([]);

  const navigate = useNavigate();
  const dataProfile = useSelector((state) => state.PROFILEDETAILS.profile);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const token = localStorage.login;

    dispatch(getAllProfileDetails(token));
  }, []);

  React.useEffect(() => {
    setProfileDetails(dataProfile);
  }, [dataProfile]);

  return (
    <Drawer variant="permanent" open={props.open}>
      <DrawerHeader>
        <IconButton onClick={props.handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>

      <Stack gap={2} justifyContent={"center"} alignItems={"center"} my={2}>
        <Avatar
          alt={`${profileDetails?.firstName} ${profileDetails?.lastName}`}
          src={`${import.meta.env.VITE_API}${profileDetails?.profileImage}`}
          sx={{
            width: props.open ? "95px" : "44px",
            height: props.open ? "95px" : "44px",
            transition: "all .228s ease",
          }}
        />

        <span
          style={{
            color: theme.palette.primary.main,
            fontSize: props.open ? 1 + "rem" : 0.8 + "rem",
            transition: "all .228s ease",
          }}
        >
          مشرف
        </span>

        <strong
          style={{
            fontSize: props.open ? 1 + "rem" : 0 + "rem",
            transition: "all .228s ease",
          }}
        >
          {`${profileDetails?.firstName} ${profileDetails?.lastName}`}
        </strong>
      </Stack>
      <Divider />
      <List>
        {list1.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            sx={{
              display: "block",
              backgroundColor:
                location.pathname === item.path
                  ? grey[theme.palette.mode === "dark" ? 900 : 300]
                  : "",
            }}
            onClick={(_) => navigate(item.path)}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: props.open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: props.open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.title}
                sx={{ opacity: props.open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {list2.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            sx={{
              display: "block",
              backgroundColor:
                location.pathname === item.path
                  ? grey[theme.palette.mode === "dark" ? 900 : 300]
                  : "",
            }}
            onClick={(_) => navigate(item.path)}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: props.open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: props.open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.title}
                sx={{ opacity: props.open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {list3.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            sx={{
              display: "block",
              backgroundColor:
                location.pathname === item.path
                  ? grey[theme.palette.mode === "dark" ? 900 : 300]
                  : "",
            }}
            onClick={(_) => navigate(item.path)}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: props.open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: props.open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.title}
                sx={{ opacity: props.open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {list4.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            sx={{
              display: "block",
              backgroundColor:
                location.pathname === item.path
                  ? grey[theme.palette.mode === "dark" ? 900 : 300]
                  : "",
            }}
            onClick={(_) => navigate(item.path)}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: props.open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: props.open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.title}
                sx={{ opacity: props.open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default SideBar;
