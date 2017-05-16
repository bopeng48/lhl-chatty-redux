import React from 'react';
import { render } from 'react-dom';

import App from './components/app.js';

import './styles/application.scss';

const root = document.getElementById('react-root');
const vdom = <App />;

render(vdom, root);

