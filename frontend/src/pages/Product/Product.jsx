import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct } from '../../features/products/productSlice';
import { useParams } from 'react-router-dom';

const Product = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector(state => state.products.product);


    useEffect(() => {
        dispatch(getProduct(id));
    }, [dispatch, id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const { sku, quantity, productName, images, productDescription } = product;

    return (
        <div>
            <h1>Product Page</h1>
            <p>SKU: {sku}</p>
            <p>Quantity: {quantity}</p>
            <p>Product Name: {productName}</p>
            <p>Images: {images}</p>
            <p>Product Description: {productDescription}</p>
        </div>
    );
};

export default Product;
