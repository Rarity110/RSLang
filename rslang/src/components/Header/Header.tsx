import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import MainNav from '../MainNav/MainNav';
import classes from './Header.module.scss';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { deleteLoginFromLocalStorage, getLogin } from '../auth-form/localStorageFunctions';
import { Context } from '../Textbook/Context';

interface HeaderProps {
  isAuthorized: boolean;
  withoutLogo?: boolean;
  withoutShadow?: boolean;
}

const loginName = getLogin();

const Header = ({ isAuthorized, withoutLogo, withoutShadow }: HeaderProps) => {
  return (
    <AppBar position="sticky" className={classes.header} elevation={withoutShadow ? 0 : 1}>
      <Container>
        <Toolbar className={classes.headerToolbar}>
          {!withoutLogo && (
            <Typography variant="h6" component="h1" color="primary" className={classes.headerLogo}>
              RSLang
            </Typography>
          )}

          <MainNav />

          <Box className={classes.headerUserBox}>
            {!isAuthorized && (
              <Link to="/auth-form" className={classes.headerLoginLink}>
                <Button variant="outlined" component="span" startIcon={<LoginIcon />}>
                  Войти
                </Button>
              </Link>
            )}

            {isAuthorized && (
              <>
                <Typography variant="body2" color="text.secondary">
                  Вы авторизованы как
                  <b> {loginName} </b>
                </Typography>
                <Button
                  onClick={deleteLoginFromLocalStorage}
                  variant="outlined"
                  component="span"
                  startIcon={<ExitToAppIcon />}>
                  Выйти
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

Header.defaultProps = {
  isAuthorized: false,
  withoutLogo: false,
  withoutShadow: false
};

export default Header;
