import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { GlobalProvider } from './state/globalState';
import { loadToken, fetchToken } from './artillery/tokens';

if (!loadToken()) {
    fetchToken().catch((error: Error) => {
        throw new Error(`It appears you have not provided the token required for the app to run. Error: ${error}`);
    });
}

ReactDOM.render(
    <GlobalProvider>
        <App />
    </GlobalProvider>,
    document.getElementById('root'),
);
