import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// import { Login } from './components/Login/Login.tsx'
// import { Register } from './components/Register/Register.tsx';
import { BrowserRouter, Router } from 'react-router-dom';
import ResponsiveAppBar from './components/Ruoter/navlin.tsx';
import {store} from './Redux/store.ts';
import { Provider } from 'react-redux';
import ColorSchemesExample from './components/Ruoter/Router.tsx';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}> 
      <BrowserRouter>
      <ResponsiveAppBar />

        <ColorSchemesExample />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
