import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, reset , deleteProduct } from "../../features/products/productSlice";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ProductHeader from "../../components/ProductHeader";


const Home = () => {

    
        const dispatch = useDispatch();
        const navigate = useNavigate();
    
        const { id } = useParams();
    
        const { message, isError, products } = useSelector(
            (state) => state.products
        );
    
        React.useEffect(() => {
            if (isError) {
                alert(message);
            }
    
            dispatch(getProducts());
    
            return () => {
                dispatch(reset());
            };
        }, [dispatch, isError, message]);
    
        const handleEdit = (productId) => {
            navigate(`/products/updateProduct/${productId}`);
        };
    
        const handleDelete = (productId) => {
            dispatch(deleteProduct(productId));
    
            // wait two seconds with alert deleted and reload page
            setTimeout(() => {
                dispatch(getProducts());
            }, 2000);
    
            navigate('/');
        };
    
        const handleToggleFavorite = async (productId) => {
            try {
                const response = await fetch(
                    `http://localhost:3000/api/product/favourite/${productId}`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
    
                if (response.ok) {
                    window.location.reload(); // Reload the page
                } else {
                    // Handle the error if the API call fails
                    throw new Error('Failed to toggle favorite status');
                }
            } catch (error) {
                console.error(error);
            }
        };
    

        const filteredProducts = products.filter(
            (product) => 
                (product.name && product.name.toLowerCase().includes(id.toLowerCase())) || 
                (product.sku && product.sku.toLowerCase().includes(id.toLowerCase()))
        );
    
        return (
            <div>
                <ProductHeader/>
                <ul>
                    {filteredProducts.map((product) => (
                        <li key={product._id}>
                            <div>
                                <strong>SKU:</strong> {product.sku}
                            </div>
                            <br />
                            <div>
                                <strong>Product Name:</strong> {product.productName}
                            </div>
                            <br />
                            <div>
                                <strong>Product Description:</strong> {product.productDescription}
                            </div>

                        
                            <button onClick={() => navigate(`/products/${product._id}`)}>go</button>
                        
                            <hr />
                        </li>
                    ))}
                </ul>
            </div>
        );
};

export default Home;
