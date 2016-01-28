import React from 'react';
import { render } from 'react-dom';

import App from './app';

import './index.scss';

const apiUrl = __CONFIG__.api;

render(
  <App apiUrl={apiUrl} />,
  document.getElementById('app')
);
