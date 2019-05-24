import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import App from './components/App';

import { fetchToken, loadToken } from './artillery/API';

if (!loadToken())
    fetchToken();

ReactDOM.render(<App />, document.getElementById('root'));
