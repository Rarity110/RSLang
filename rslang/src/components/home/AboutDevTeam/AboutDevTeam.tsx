import React from 'react';
import { Box, Chip, Container, Divider, Typography } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Developer from '../Developer/Developer';
import classes from './AboutDevTeam.module.scss';
import avatarTatiana from '../../../assets/images/developer-tatiana.png';
import avatarAlex from '../../../assets/images/developer-alex.png';
import avatarDaria from '../../../assets/images/developer-daria.png';

const AboutDevTeam = () => {
  return (
    <Box className={classes.aboutDev} py={6}>
      <Container>
        <Typography variant="h4" color="primary" className={classes.aboutDevTitle}>
          Команда разработки
        </Typography>

        <Developer
          name="Татьяна"
          githubName="rarity110"
          description="Координировала рабочий процесс, распределяя задания и мотивируя команду. Взяла на себя вопросы, связанные с начальной настройкой проекта. Разработала дизайн и функционал электронного учебника и списка слов. Принимала участие в разработке механизма изучения слов, настроила контекст для хранения слов для авторизованных пользователей"
          img={avatarTatiana}
          rolesNode={
            <>
              <Chip label="Team lead" color="warning" icon={<AutoAwesomeIcon />} />
              <Chip label="Frontend developer" color="primary" />
            </>
          }
        />
        <Divider className={classes.aboutDevDivider} />
        <Developer
          name="Алексей"
          githubName="AVBr0"
          description="Полностью взял на себя вопросы, связанные с регистрацией новых пользователей в системе и их дальнейшей авторизацией, настроил контекст для хранения информации о текущем пользователе. Реализовал игру «Спринт» и обработку ее результатов"
          img={avatarAlex}
          rolesNode={<Chip label="Frontend developer" color="primary" />}
        />
        <Divider className={classes.aboutDevDivider} />
        <Developer
          name="Дарья"
          githubName="ipipka"
          description="Разработала дизайн и функционал главной страницы. Реализовала игру «Аудиовызов», страницу с ежедневной статистикой обучения. Принимала участие в разработке механизма изучения слов. Старалась не унывать :)"
          img={avatarDaria}
          rolesNode={<Chip label="Frontend developer" color="primary" />}
        />
      </Container>
    </Box>
  );
};

export default AboutDevTeam;
