import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Alert, AlertTitle, Box, Container, Link as MuiLink, Typography } from '@mui/material';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { Context } from '../components/Textbook/Context';

const StatisticsPage = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <Box display="flex" flexDirection="column" style={{ minHeight: '100vh' }}>
      <Header {...{ isAuthorized }} />

      <Box flexGrow="1">
        {!isAuthorized && (
          <Container>
            <Typography variant="h4" color="primary" mt={4} gutterBottom>
              Статистика
            </Typography>
            <Alert severity="error">
              <AlertTitle>Недостаточно прав!</AlertTitle>
              Статистика обучения доступна только авторизованным пользователям. Чтобы получить
              доступ этой странице нужно{' '}
              <Link to="/auth-form">
                <MuiLink component="span">войти в приложение</MuiLink>
              </Link>
            </Alert>
          </Container>
        )}

        {/*{isAuthorized && (<Statistics />)}*/}
      </Box>

      <Footer />
    </Box>
  );
};

export default StatisticsPage;
