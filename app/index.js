import React from 'react';
import { render } from 'react-dom';

import App from './app';

import './index.scss';

var api = __CONFIG__.api;
var defaults = __CONFIG__.defaults;

render(
  <App api={api} defaults={defaults} />,
  document.getElementById('app')
);
