import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import AuthorizedPage from '../../pages/AuthorizedPage';
import HomePage from '../../pages/HomePage';
import StatisticsPage from '../../pages/StatisticsPage';
import classes from './App.module.scss';
import { TextbookPage } from '../../pages/TextbookPage';
import SprintGamePage from '../../pages/SprintGamePage';

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <div className={classes.page}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/textbook" element={<TextbookPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/auth-form" element={<AuthorizedPage />} />
          <Route path="/sprint-game" element={<SprintGamePage />} />
        </Routes>
      </div>
    </StyledEngineProvider>
  );
}

export default App;
