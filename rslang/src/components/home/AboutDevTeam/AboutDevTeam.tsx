import React from 'react';
import { Box, Chip, Container, Divider, Typography } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Developer from '../Developer/Developer';
import classes from './AboutDevTeam.module.scss';
import avatarDaria from '../../../assets/images/developer-daria.png';

const AboutDevTeam = () => {
  return (
    <Box className={classes.aboutDev} py={6}>
      <Container>
        <Typography variant="h4" color="primary" className={classes.aboutDevTitle}>
          Команда разработки
        </Typography>

        {/* TODO: Дописать вклад каждого из участников */}
        <Developer
          name="Татьяна"
          githubName="rarity110"
          description="Координировала рабочий процесс, распределяя задания и мотивируя команду. Взяла на себя вопросы, связанные с начальной настройкой проекта. Разработала дизайн и функционал электронного учебника и списка слов."
          img=""
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
          description="Реализовал авторизацию пользователей в приложении, регистрацию новых пользователей"
          img=""
          rolesNode={<Chip label="Frontend developer" color="primary" />}
        />
        <Divider className={classes.aboutDevDivider} />
        <Developer
          name="Дарья"
          githubName="ipipka"
          description="Разработала дизайн и функционал главной страницы."
          img={avatarDaria}
          rolesNode={<Chip label="Frontend developer" color="primary" />}
        />
      </Container>
    </Box>
  );
};

export default AboutDevTeam;
