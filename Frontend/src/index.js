import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';

/**
 * Main Index, responsible for loading main application
 */
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);