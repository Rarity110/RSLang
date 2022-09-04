import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Typography } from '@mui/material';
import navigationList from '../../consts/navigationList';
import { Context } from '../Textbook/Context';
import classes from './MainNav.module.scss';

const MainNav = () => {
  const { isAuthorized } = useContext(Context);

  return (
    <nav className={classes.nav}>
      {navigationList.map((item) => {
        const showItem = item.isPublic || isAuthorized;

        return showItem ? (
          <NavLink
            key={item.id}
            to={item.link}
            className={({ isActive }) =>
              isActive ? classes.navItemActive : classes.navItemInactive
            }>
            <Typography component="span" className={classes.navText}>
              {item.title}
            </Typography>
          </NavLink>
        ) : null;
      })}
    </nav>
  );
};

export default MainNav;
