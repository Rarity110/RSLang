import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import classes from './StartSection.module.scss';
import img from '../../../assets/images/home-base.png';

const StartSection = () => {
  return (
    <Container>
      <Box className={classes.start} pb={8} mt={1}>
        <Box className={classes.startText}>
          <Typography variant="h2" className={classes.startTitle} color="primary">
            RSLang
          </Typography>
          <Typography className={classes.startLead}>
            Хочешь обогатить словарный запас английского языка?
          </Typography>
          <Typography>
            Наше приложение поможет с&nbsp;лёгкостью запоминать новые слова. Изучай английский язык
            с&nbsp;RSLang!
          </Typography>
        </Box>
        <Box className={classes.startImgWrap}>
          <img src={img} alt="" className={classes.startImg} />
        </Box>
      </Box>
    </Container>
  );
};

export default StartSection;
