import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ContextProvider from './context';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';

const domain: string = "dev-3b4qpqc44zjfp1u0.us.auth0.com";
const clientId: string = "Lzar95ZNjQYCe79A2hSdfwMGAkP3RGgG";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <BrowserRouter>
        <ContextProvider>
            <Auth0Provider
                domain={domain}
                clientId={clientId}
               authorizationParams={{ redirect_uri: window.location.origin +"/dashBoardPage"}}
            >
                <App />
            </Auth0Provider>
        </ContextProvider>
    </BrowserRouter>
);
