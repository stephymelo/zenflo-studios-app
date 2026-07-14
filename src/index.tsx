import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './styles.scss';
import reportWebVitals from './reportWebVitals';
import { installTranslateGuard } from './utils/translateGuard';

installTranslateGuard();

// Language lives in the URL as a path prefix (/es). English is the default and
// has no prefix. A per-language basename keeps router navigation in-language.
const LANGS = ['en', 'es'];
const seg = window.location.pathname.split('/')[1];
const basename = LANGS.includes(seg) ? `/${seg}` : '/';
document.documentElement.lang = LANGS.includes(seg) ? seg : 'en';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
   <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
