import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthorizedPage from '../../pages/AuthorizedPage';
import HomePage from '../../pages/HomePage';
import StatisticsPage from '../../pages/StatisticsPage';
import classes from './App.module.scss';

function App() {
  return (
    <div className={classes.page}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/auth-form" element={<AuthorizedPage />} />
      </Routes>
    </div>
  );
}

export default App;
