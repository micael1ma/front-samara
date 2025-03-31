import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import Home from '../src/pages/Home';
import Login from '../src/pages/Login';
import Register from '../src/pages/Register';
import Books from '../src/pages/Books';
import PrivateRoute from './components/privateRoute';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute element={<Home />} />} />
        <Route path="/books" element={<PrivateRoute element={<Books />} />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
