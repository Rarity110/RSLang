import React from 'react';
import { Box, Card, CardMedia, CardContent, Container, Grid, Typography } from '@mui/material';
import aboutAppList from '../../../consts/aboutAppList';
import classes from './AboutApp.module.scss';

const AboutApp = () => {
  return (
    <Box className={classes.about} py={2} mb={8}>
      <Container>
        <Typography variant="h4" color="primary" className={classes.aboutTitle}>
          О приложении
        </Typography>
        <Typography>
          При помощи RSLang можно выучить более 3&nbsp;500 востребованных английских слов, что
          существенно расширит твой словарный запас. Обучение строится на игровом подходе. Благодаря
          этому процесс приносит удовольствие, так что ты не потеряешь интерес к изучению
          английского языка!
        </Typography>

        <Grid container rowSpacing={4} columnSpacing={{ xs: 0, sm: 4, md: 6 }} mt={1}>
          {aboutAppList.map((item) => (
            <Grid item xs={12} sm={6} lg={4} key={item.id}>
              <Card className={classes.aboutCard}>
                <CardMedia
                  component="img"
                  image={item.img}
                  alt=""
                  className={classes.aboutCardImg}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box className={classes.aboutNote} pt={3}>
          <Typography variant="caption" color="text.disabled">
            * Некоторые функции доступны только зарегистрированным пользователям
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutApp;
