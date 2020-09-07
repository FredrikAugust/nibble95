import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { GlobalProvider } from './globalState';
import { loadToken, fetchToken } from './artillery/tokens';

if (!loadToken()) {
    fetchToken().catch(() => console.warn(
        'It appears you have not provided the token required for the app to run.',
    ));
}

ReactDOM.render(
    <GlobalProvider>
        <App />
    </GlobalProvider>,
    document.getElementById('root'),
);
