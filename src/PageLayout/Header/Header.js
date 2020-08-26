import React from "react";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import { useStyles } from "./HeaderStyles.js";
import { Link, Route } from "react-router-dom";
import { useAppContext } from "../../Context/ContextProvider";
import { userTypeRoutes } from "../../Router/UserTypeRoutes";

export default function Header({ title }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { user, updateUser } = useAppContext();
  const customRoutes = [];

  function getRoutesForUserType() {
    if (user.userRole) {
      console.log(user, userTypeRoutes);
      let routes = userTypeRoutes[user.userRole];
      routes.map((route, key) => customRoutes.push(route));
      console.log(customRoutes);
    }
  }
  getRoutesForUserType();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    user && (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {user &&
              customRoutes.map((route) => {
                if (!route.customRoute) {
                  return (
                    <Link to={route["path"]}>
                      <ListItem button>
                        <ListItemIcon>
                          {" "}
                          <InboxIcon />{" "}
                        </ListItemIcon>
                        <ListItemText primary={route["name"]} />
                      </ListItem>
                    </Link>
                  );
                }
              })}
          </List>
          <Divider />
        </Drawer>
      </div>
    )
  );
}
