import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

const rootElem = document.getElementById('root');
const root = ReactDOM.createRoot(rootElem);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
