
import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, reset } from "../features/products/productSlice";
import ProductHeader from "../components/ProductHeader";
import ProductTable from "../components/ProductTable";

const Home = () => {
  const dispatch = useDispatch();

  const { message, isError, products } = useSelector(
    state => state.products
  );

  useEffect(() => {
    if (isError) {
      alert(message);
    }

    dispatch(getProducts());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message]);

  return (
    <div>
      <ProductHeader title="Products" />
      <ProductTable products={products} />
    </div>
  );
};

export default Home;