import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
//import { registerSW } from 'virtual:pwa-register';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import { RecoilRoot } from 'recoil';

// if ('serviceWorker' in navigator && /localhost/.test(window.location.href)) {
//     registerSW();
// }

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RecoilRoot>
            <App />
        </RecoilRoot>
    </React.StrictMode>,
);
