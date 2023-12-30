import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/ProductHeader.css';

const ProductHeader = ({ title }) => {
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
        <h2 style={{ textAlign: 'left'}}>{title}</h2>
      </div>
      <div className="container">
        <div className="search-container">
          <input
            style={{ width: 'calc(100% - 50px)'}}

            type="text"
            placeholder="Search for products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch} style={{marginLeft: '-50px'}}>
            <img src="search.svg" alt="favourites" style={{ width: '13px', height: '13px', marginRight : '5px' }} onError={(e) => { e.target.onerror = null; e.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYmXo4Tv234vEBakj2N1N4mdeo3PN0gVHSSA&usqp=CAU'}} />
              Search 
          </button>
        </div>
        <button className="new-product-button" onClick={handleNewProduct}>
          New Product
        </button>
        <button className="favourites-button" onClick={handleSeeFavourites}>
            <img src="starred.svg" alt="favourites" onError={(e) => { e.target.onerror = null; e.target.src = "data:image/png;base64,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" }} />
        </button>
      </div>
    </div>
  );
};

export default ProductHeader;