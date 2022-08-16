import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import StatisticsPage from '../../pages/StatisticsPage';
import classes from './App.module.scss';

function App() {
  return (
    <div className={classes.page}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
      </Routes>
    </div>
  );
}

export default App;
