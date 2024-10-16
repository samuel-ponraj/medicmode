import React, { useState } from 'react';
import './Drawer.css';
import ReviewPost from './reviewpost/ReviewPost'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer as MUIDrawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Drawer = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(!isSmallScreen);

  const handleToggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className="drawer-layout" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Secondary navbar for dashboard, placed below the main navbar */}
      <AppBar position="fixed" style={{  top: isSmallScreen ? '70px' : '80px', height: '65px', zIndex: theme.zIndex.drawer + 1, backgroundColor: 'var(--light-green)' }}>
        <Toolbar>
          {/* MenuIcon always displayed on all screen sizes */}
          <IconButton onClick={handleToggleDrawer} edge="start" color="inherit">
            <MenuIcon style={{color: 'var(--orange)' }}/>
          </IconButton>
          {/* Dashboard heading */}
          <Typography variant="h6" style={{ marginLeft: '10px', color: 'var(--orange)' }}>
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main content area */}
      <div style={{ flexGrow: 1, padding: theme.spacing(3), marginTop: '180px', display: 'flex', flexDirection: 'column' }}>
        <Box display="flex" flexGrow={1}>
          {/* Sidebar Drawer starts below the Dashboard heading */}
          <MUIDrawer
            variant={isSmallScreen ? 'temporary' : 'persistent'}
            open={open}
            onClose={handleToggleDrawer}
            sx={{
                '& .MuiDrawer-paper': {
                  backgroundColor: 'var(--light-green)',
                  width: '240px',
                  position: 'absolute', // Ensures it respects the layout
                  top: isSmallScreen ? '135px' : '145px',
                  left: 0,
                  height: 'calc(100vh - 64px)', // Adjust height to stop above the footer
                  overflow: 'auto', // Allow scrolling if content exceeds height
                },
              }}
            anchor="left"
          >
            <div>
              <List>
                {['Home', 'About', 'Contact'].map((text) => (
                  <ListItem button key={text}>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </div>
          </MUIDrawer>

          {/* Main content area next to the Drawer */}
          <Box
            component="main"
            style={{
              flexGrow: 1,
              padding: theme.spacing(3),
              transition: 'margin 0.3s ease',
              marginLeft: open && !isSmallScreen ? '240px' : '0',
              marginTop: '-100px'
            }}
          >
            <ReviewPost />
            {/* Add your dashboard routing or additional content here */}
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Drawer;
