import React from 'react';
import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import MainNav from '../MainNav/MainNav';
import classes from './Header.module.scss';

const Header = () => {
  return (
    <AppBar color="transparent" position="sticky" className={classes.header}>
      <Container>
        <Toolbar className={classes.headerToolbar}>
          <Typography variant="h6" component="h1" className={classes.headerTitle}>
            RSLang
          </Typography>

          <MainNav />

          {/* TODO: user info */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
