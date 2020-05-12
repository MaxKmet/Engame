import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from '@material-ui/core';

const TopBar = ({ classes, text }) => (
      <AppBar position="relative">
        <Toolbar>         
          <Link href='/' underline="none" variant="h5" color="inherit" noWrap>
            {text}
          </Link>
        </Toolbar>
      </AppBar>
        
);

export default TopBar;