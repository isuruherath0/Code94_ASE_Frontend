import React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const ProductHeader = () => {

    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [searchData, setSearchData] = useState("");

      const handleNewProduct = () => {
        navigate("/products/addProduct");
    };

    const handleSeeFavourites = () => {
        navigate("/favourites");
    };


    const handleSearch = () => {
        if (searchTerm !== "") {
            setSearchData(searchTerm);
            navigate(`/search/${searchTerm}`);
        }
    };
  return (
    <div>
      <h2 style={{ textAlign: 'left' }}>Products</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleNewProduct}>New Product</button>
      <button onClick={handleSeeFavourites}>Favourites</button>
    </div>
  );
};

export default ProductHeader;
