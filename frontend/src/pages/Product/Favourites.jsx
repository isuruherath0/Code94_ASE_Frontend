import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, reset , deleteProduct } from "../../features/products/productSlice";
import { useNavigate } from "react-router-dom";
import ProductHeader from "../../components/ProductHeader";
import ProductTable from "../../components/ProductTable";

const Favourites = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { message, isError, products } = useSelector(
        state => state.products
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



    // Filter products by favourite status
    const filteredProducts = products.filter(product =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase()) && product.favourite
    );

    return (
        <div>
            <ProductHeader title="Favourite Products"/>   
            <ProductTable
                 products={filteredProducts}
            />
            <button onClick={() => navigate('/')}> Home</button>
           
        </div>
    );
};

export default Favourites;