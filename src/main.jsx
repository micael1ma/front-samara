import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import Home from '../src/pages/Home';
import Login from '../src/pages/Login';
import Register from '../src/pages/Register';
import User from '../src/pages/User';
import PrivateRoute from './components/privateRoute';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute element={<Home />} />} />
        <Route path="/user" element={<PrivateRoute element={<User />} />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
