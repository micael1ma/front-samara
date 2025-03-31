import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Home from '../src/pages/Home';
import Books from '../src/pages/Books';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
