import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../features/products/productSlice';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
    const [sku, setSku] = useState('');
    const [quantity, setQuantity] = useState('');
    const [productName, setProductName] = useState('');
    const [imageFile, setImageFile] = useState(null); // Store the selected file
    const [productDescription, setProductDescription] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create a new product object
        const newProduct = {
            sku,
            quantity: parseInt(quantity),
            productName,
            images: imageFile ? imageFile.name : '', // Use the file name if an image is selected
            productDescription,
        };

        // Dispatch the addProduct action
        dispatch(createProduct(newProduct));

        // Reset the form
        setSku('');
        setQuantity('');
        setProductName('');
        setImageFile(null);
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
        </div>
    );
}

export default AddProduct;
