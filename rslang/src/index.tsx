import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './components/App/App';
import { AuthorizeState } from './components/auth-form/AuthorizeContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <AuthorizeState>
    <HashRouter>
      <App />
    </HashRouter>
  </AuthorizeState>
);
