import React from 'react';
import { Box, Typography } from '@mui/material';
import classes from './StartSection.module.scss';
import img from '../../../assets/images/home-base.png';

const StartSection = () => {
  return (
    <Box className={classes.about}>
      <Box className={classes.aboutText}>
        <Typography variant="h2" className={classes.aboutTitle} color="primary">
          RSLang
        </Typography>
        <Typography className={classes.aboutLead}>
          Хочешь обогатить словарный запас английского языка?
        </Typography>
        <Typography className={classes.aboutTitle}>
          Наше приложение поможет с&nbsp;лёгкостью запоминать новые слова. Изучай английский язык
          с&nbsp;RSLang!
        </Typography>
      </Box>
      <Box className={classes.aboutImgWrap}>
        <img src={img} alt="" className={classes.aboutImg} />
      </Box>
    </Box>
  );
};

export default StartSection;
