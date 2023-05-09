import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import TagManager from 'react-gtm-module';
import ReactGA from 'react-ga4';

const tagManagerArgs = {
  gtmId: 'G-B98V96Q6XX',
};

// gtm initialize
TagManager.initialize(tagManagerArgs);
// ga4 initialize
ReactGA.initialize('G-B98V96Q6XX');

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
