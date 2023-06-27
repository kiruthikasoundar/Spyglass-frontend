import React from "react";
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { navbarStyles } from "./Navbar/Styles";
import { useParams, useNavigate } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useUserInfoQuery,useLogoutMutation } from "../api/userApi";
import ViewListIcon from '@mui/icons-material/ViewList';
import { ListItemAvatar } from '@mui/material';
import Avatar from '@material-ui/core/Avatar';
import { gapi } from 'gapi-script';

const drawerWidth = 240;

const Navbar = () => {
  const navigate = useNavigate();

  const {data: userinfo} = useUserInfoQuery();

  const [logout] = useLogoutMutation();

  function handleLogout() {
    logout()
    .unwrap()
    .then(() => {
      navigate('/');
      window.location.reload();
    })
  }

  
  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, backgroundColor: '#5603AD', alignItems: 'center' }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Spyglass - A Financial Goal Planner
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={navbarStyles.drawer}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
        <ListItem>
            <ListItemAvatar >
              <Avatar alt={userinfo?.name} src={userinfo?.picture} />
            </ListItemAvatar>
            <ListItemText primary={userinfo?.name} />
          </ListItem>
          <ListItem onClick={() => navigate('/newgoal')} disablePadding>
            <ListItemButton>
              <ListItemIcon sx={navbarStyles.icons}>
                <AddCircleOutlineIcon />
              </ListItemIcon>
              <ListItemText sx={navbarStyles.text} primary="New Goal" />
            </ListItemButton>
          </ListItem>
          <ListItem onClick={() => navigate('/goals')} disablePadding>
            <ListItemButton>
              <ListItemIcon sx={navbarStyles.icons}>
                <ViewListIcon />
              </ListItemIcon>
              <ListItemText sx={navbarStyles.text} primary="My Goals" />
            </ListItemButton>
          </ListItem>
          <ListItem onClick={() => navigate('/dashboard')} disablePadding>
            <ListItemButton>
              <ListItemIcon sx={navbarStyles.icons}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText sx={navbarStyles.text} primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem onClick={() => navigate('/')} disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon sx={navbarStyles.icons}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText sx={navbarStyles.text} primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      
    </>
  );
};

export default Navbar;
