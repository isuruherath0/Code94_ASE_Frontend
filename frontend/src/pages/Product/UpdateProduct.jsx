import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'; // Import useParams from react-router-dom
import { updateProduct, getProduct } from '../../features/products/productSlice';
import { useNavigate } from 'react-router-dom';



const UpdateProduct = () => {
    const { id } = useParams(); 
    const product = useSelector(state => state.products.product); 
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [sku, setSku] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [productName, setProductName] = useState('');
    const [images, setImages] = useState([]); // Add images state
    const [imageFile, setImageFile] = useState(null); 
    const [productDescription, setProductDescription] = useState(''); // Add productDescription state

    useEffect(() => {
        // Fetch product from Redux
        dispatch(getProduct(id));
    }, [dispatch, id]);

    useEffect(() => {
        // Set initial form values from product in Redux
        if (product) {
            setSku(product.sku);
            setQuantity(product.quantity);
            setProductName(product.productName);
            setImages(product.images); // Set images state from product in Redux
            setProductDescription(product.productDescription); // Set productDescription state from product in Redux
        }
    }, [product]);

    const handleUpdate = () => {
        // Update product through Redux
        dispatch(updateProduct({ id, sku, quantity: parseInt(quantity), productName, images, productDescription }));
        navigate('/');
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    };

    return (
        <div>
            <form>
                <label>SKU:</label>
                <input type="text" value={sku} onChange={e => setSku(e.target.value)} />

                <label>Quantity:</label>
                <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} />

                <label>Product Name:</label>
                <input type="text" value={productName} onChange={e => setProductName(e.target.value)} />

                <label>
                    Image:
                    <input type="file" onChange={handleImageChange} />
                </label>

                <label>Product Description:</label> 
                <input type="text" value={productDescription} onChange={e => setProductDescription(e.target.value)} />

                <button type="button" onClick={handleUpdate}>Update</button>
            </form>
        </div>
    );
};

export default UpdateProduct;
