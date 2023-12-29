import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../features/products/productSlice';
import { useNavigate } from 'react-router-dom';

const AddProductForm = () => {

    const [sku, setSku] = useState('');
    const [quantity, setQuantity] = useState('');
    const [productName, setProductName] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [productDescription, setProductDescription] = useState('');


    const dispatch = useDispatch();
  const navigate = useNavigate();

 


    const handleSubmit = (e) => {
        e.preventDefault();
    
        const newProduct = {
          sku,
          quantity: parseInt(quantity),
          productName,
          images: imageFile ? imageFile.name : '',
          productDescription,
        };
    
        dispatch(createProduct(newProduct));
    
        setSku('');
        setQuantity('');
        setProductName('');
        setImageFile(null);
        setProductDescription('');
    
        navigate('/');
      };


      const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
      };
    


  return (
    <form onSubmit={handleSubmit}>
      <label>
        SKU:
        <input type="text" value={sku} onChange={(e) => setSku(e.target.value)} />
      </label>
      <br />
      <label>
        Quantity:
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      </label>
      <br />
      <label>
        Product Name:
        <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
      </label>
      <br />
      <label>
        Image:
        <input type="file" onChange={handleImageChange} />
      </label>
      <br />
      <label>
        Product Description:
        <textarea value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
      </label>
      <br />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddProductForm;