import React from 'react';
import { NavLink } from 'react-router-dom';
import { Typography } from '@mui/material';
import navigationList from '../../consts/navigationList';
import classes from './MainNav.module.scss';

const MainNav = () => {
  return (
    <nav className={classes.nav}>
      {navigationList.map((item) => (
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
      ))}
    </nav>
  );
};

export default MainNav;
