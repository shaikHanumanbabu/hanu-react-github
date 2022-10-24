import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { GithubProvider } from './context/context';
import { Auth0Provider } from '@auth0/auth0-react';

// dev-ai2qi7pb6h6c7xml.us.auth0.com
// 1a6y1GJVRAdEIfvyTT2s2jZ1RJf6DbOw
const domain = 'dev-ai2qi7pb6h6c7xml.us.auth0.com'
const clientId = '1a6y1GJVRAdEIfvyTT2s2jZ1RJf6DbOw'
ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider 
    domain={domain}
    clientId={clientId}
    cacheLocation="localstorage"
    redirectUri={window.location.origin}>
      <GithubProvider>
        <App />
      </GithubProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
