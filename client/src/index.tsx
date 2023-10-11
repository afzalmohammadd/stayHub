import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import LoginPage from './scenes/loginPage';
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Home from './scenes/home';
import { Provider } from 'react-redux';
import store from './Redux/App/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}></Route>
        <Route path='/login' element={<LoginPage />} ></Route>
        <Route path='/homepage' element={<Home />} ></Route>
        
      </Routes>
    </BrowserRouter>
    </Provider>
    
   
  </React.StrictMode>
);