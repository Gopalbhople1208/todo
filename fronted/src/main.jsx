import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
 
import "./style/index.css"
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'

import React from 'react';
import ReactDOM from 'react-dom/client';


import { GoogleOAuthProvider } from '@react-oauth/google';


createRoot(document.getElementById('root')).render(

    <BrowserRouter>
    <React.StrictMode>
    <GoogleOAuthProvider clientId="577348361922-tqsr025ee745amsbjbp7cjrn43omfs3o.apps.googleusercontent.com">

      <App />
      </GoogleOAuthProvider>
      </React.StrictMode>
    </BrowserRouter>
  

)
