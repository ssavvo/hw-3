import * as React from 'react';
import * as ReactDom from 'react-dom/client';
import App from './App'
import './styles/index.scss'

ReactDom
  .createRoot(document.getElementById('root')!)
  .render(
    <React.StrictMode>
      <App /> 
    </React.StrictMode>
  );