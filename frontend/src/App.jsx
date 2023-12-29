import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Home from './pages/Home.jsx';
import Product from './pages/Product.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import './App.css'

const theme = createTheme({
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <header className="header">
          <Header />
        </header>

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/developer/:id" element={<Product />} />
          </Routes>
        </div>

        <footer className="footer">
          <Footer />
        </footer>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;