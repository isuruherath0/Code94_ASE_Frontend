import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Home from './pages/Home.jsx';
import Product from './pages/Product/Product.jsx';
import AddProduct from './pages/Product/AddProduct.jsx';
import Header from './components/Header.jsx';
import UpdateProduct from './pages/Product/UpdateProduct.jsx';
import Favourites from './pages/Product/Favourites.jsx';
import Search from './pages/Product/search.jsx';
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
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/search/:id" element={<Search />} />
            <Route path="/products/:id" element={<Product />} />
            <Route path="/products/addProduct" element={<AddProduct />} />
            <Route path="/products/updateProduct/:id" element={<UpdateProduct />} />

          </Routes>
        </div>

      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;