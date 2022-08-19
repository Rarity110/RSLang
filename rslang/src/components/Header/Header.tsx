import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import MainNav from '../MainNav/MainNav';
import classes from './Header.module.scss';

interface HeaderProps {
  isAuthorized?: boolean;
  withoutLogo?: boolean;
  withoutShadow?: boolean;
}

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
            {/* TODO: Исправить ссылку на авторизацию */}
            {!isAuthorized && (
              <Link to="/" className={classes.headerLoginLink}>
                <Button variant="outlined" component="span" startIcon={<LoginIcon />}>
                  Войти
                </Button>
              </Link>
            )}

            {/* TODO: Выводить информацию по авторизованному пользователю и кнопку выхода? */}
            {isAuthorized && (
              <Typography variant="body2" color="text.disabled">
                Вы авторизованы
              </Typography>
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
