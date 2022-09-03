import React from 'react';
import { Box, Container, Typography, Link as MuiLink } from '@mui/material';
import img404 from '../../assets/images/404-base.png';
import classes from './NotFound.module.scss';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Box className={classes.page404}>
      <Container>
        <Box className={classes.page404Panel}>
          <Box className={classes.page404Text}>
            <Typography variant="h2" color="primary">
              404
            </Typography>
            <Typography variant="h5" gutterBottom>
              Страница не найдена
            </Typography>
            <Typography gutterBottom>
              Что-то пошло не так! Страница, которую ты запрашиваешь не существует. Возможно она
              была удалена или просто неверно введен адрес страницы
            </Typography>
            <Typography>
              <Link to="/">
                <MuiLink component="span">Вернуться на главную страницу</MuiLink>
              </Link>
            </Typography>
          </Box>
          <Box className={classes.page404ImgWrap}>
            <img src={img404} alt="" className={classes.page404Img} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFound;
