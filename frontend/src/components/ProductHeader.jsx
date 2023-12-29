import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/ProductHeader.css'; 

const ProductHeader = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const handleNewProduct = () => {
    navigate("/products/addProduct");
  };

  const handleSeeFavourites = () => {
    navigate("/favourites");
  };

  const handleSearch = () => {
    if (searchTerm !== "") {
      navigate(`/search/${searchTerm}`);
    }
  };

  return (
    <div>
        <div className="product-header">
        <h2 style={{ textAlign: 'left' }}>Products</h2>

        </div>
      <div className="container">
        <div className="search-container">
            <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-button" onClick={handleSearch}>
                Search
            </button>
        </div>
        <button className="new-product-button" onClick={handleNewProduct}>
            New Product
        </button>
        <button className="favourites-button" onClick={handleSeeFavourites}>
            <img src="starred.svg" alt="favourites" />
        </button>
        </div>
    </div>
  );
};

export default ProductHeader;
