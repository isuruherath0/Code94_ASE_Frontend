import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct } from '../../features/products/productSlice';
import { useParams } from 'react-router-dom';
import ProductHeader from '../../components/ProductHeader';

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
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <ProductHeader title="Product Details" />

      <p style={{ color: '#969191' }}>
        <span style={{ fontWeight: 'bold', color: '#162427',fontSize : '20px' }}>SKU:</span> {sku}
      </p>
      <p style={{ color: '#969191' }}><span style={{ fontWeight: 'bold' , color: '#162427',fontSize : '20px'}}>Product Name: </span>{productName}</p>
      <p style={{ color: '#969191' }}><span style={{ fontWeight: 'bold' , color: '#162427', fontSize : '20px'}}>Quantity: </span>{quantity}</p>
      <div>
        <img src={`/${product.images || 'image.png'}`} alt={productName} style={{ width: '300px', height: '200px', marginTop: '10px' }} />
      </div>
      <p style={{ color: '#969191' }}><span style={{ fontWeight: 'bold' , color: '#162427',fontSize : '20px'}}>Product Description:</span> {productDescription}</p>
    </div>
  );
};

export default Product;
