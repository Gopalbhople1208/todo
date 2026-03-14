// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
 
// import "./style/index.css"
// import App from './App.jsx'
// import {BrowserRouter} from 'react-router-dom'

// import React from 'react';
// import ReactDOM from 'react-dom/client';


// import { GoogleOAuthProvider } from '@react-oauth/google';


// createRoot(document.getElementById('root')).render(

//     <BrowserRouter>
//     <React.StrictMode>
//     <GoogleOAuthProvider clientId="577348361922-tqsr025ee745amsbjbp7cjrn43omfs3o.apps.googleusercontent.com">

//       <App />
//       </GoogleOAuthProvider>
//       </React.StrictMode>
//     </BrowserRouter>
  

// )




import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.jsx";
import "./style/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId="338134980170-2ihbin5q60rrrc7f8o86sit4prgnmm3m.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>
);
