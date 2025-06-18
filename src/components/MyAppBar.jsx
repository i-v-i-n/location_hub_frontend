import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { Height, WidthFullRounded } from '@mui/icons-material';

function MyAppBar(){
  return (
    <AppBar position="static" sx={{backgroundColor:"black"}}>
      <Toolbar>
        <Box
          component="img"
          src="../assets/location_hub.jpg"
          sx={{height:70}}
          />
      </Toolbar>
    </AppBar>
  );
}

export default MyAppBar;
