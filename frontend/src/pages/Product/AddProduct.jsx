
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../features/products/productSlice';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
    const [sku, setSku] = useState('');
    const [quantity, setQuantity] = useState('');
    const [productName, setProductName] = useState('');
    const [images, setImages] = useState([]);
    const [productDescription, setProductDescription] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create a new product object
        const newProduct = {
            sku,
            quantity: parseInt(quantity),
            productName,
            images,
            productDescription,
        };

        // Dispatch the addProduct action
        dispatch(createProduct(newProduct));

        // Reset the form
        setSku('');
        setQuantity('');
        setProductName('');
        setImages([]);
        setProductDescription('');

        // Navigate to home page after adding product
        navigate('/');
        
    };

    return (
        <div>
            <h2>Add Product</h2>
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
                    Images:
                    <input type="file" multiple onChange={(e) => setImages(Array.from(e.target.files))} />
                </label>
                <br />
                <label>
                    Product Description:
                    <textarea value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
                </label>
                <br />
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default AddProduct;
