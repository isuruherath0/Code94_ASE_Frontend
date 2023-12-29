import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, reset , deleteProduct } from "../../features/products/productSlice";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ProductHeader from "../../components/ProductHeader";
import ProductTable from "../../components/ProductTable";

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
    
    

        const filteredProducts = products.filter(
            (product) => 
                (product.name && product.name.toLowerCase().includes(id.toLowerCase())) || 
                (product.sku && product.sku.toLowerCase().includes(id.toLowerCase()))
        );
    
        return (
            <div>
                <ProductHeader/>
                <ProductTable
                products={filteredProducts}
                />
                <button onClick={() => navigate('/')}>Go Home</button>
            </div>
        );
};

export default Home;
