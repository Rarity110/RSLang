import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Popover,
  Toolbar,
  Typography
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import MainNav from '../MainNav/MainNav';
import classes from './Header.module.scss';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { deleteLoginFromLocalStorage, getLogin } from '../auth-form/localStorageFunctions';
import MenuIcon from '@mui/icons-material/Menu';

interface HeaderProps {
  isAuthorized: boolean;
  withoutLogo?: boolean;
  withoutShadow?: boolean;
}

const loginName = getLogin();

const Header = ({ isAuthorized, withoutLogo, withoutShadow }: HeaderProps) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" className={classes.header} elevation={withoutShadow ? 0 : 1}>
      <Container>
        <Toolbar className={classes.headerToolbar}>
          {!withoutLogo && (
            <Typography variant="h6" component="h1" color="primary" className={classes.headerLogo}>
              RSLang
            </Typography>
          )}

          <Box className={classes.headerNav} sx={{ display: { xs: 'none', md: 'block' } }}>
            <MainNav />
          </Box>

          <Box className={classes.headerNav} sx={{ display: { xs: 'block', md: 'none' } }}>
            <IconButton aria-label="Attribution" color="default" onClick={handleClick}>
              <MenuIcon />
            </IconButton>
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}>
              <MainNav />
            </Popover>
          </Box>

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
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className={classes.headerUserName}>
                  Привет, <b> {loginName} </b>
                </Typography>
                <Button
                  onClick={deleteLoginFromLocalStorage}
                  variant="outlined"
                  className={classes.headerLogoutBtn}
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
