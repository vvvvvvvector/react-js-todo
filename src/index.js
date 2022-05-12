import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Rounter } from 'react-router-dom';

import App from './App';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Rounter>
      <App />
    </Rounter>
  </React.StrictMode>
);
