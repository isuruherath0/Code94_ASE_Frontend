import React from "react";
import { useDispatch , useSelector } from 'react-redux';
import { getProducts , reset } from "../features/products/productSlice";


const Home = () => {


    const dispatch = useDispatch ()

    const { message , isError , products } = useSelector(
        state => state.products)

    React.useEffect(() => {
        if (isError) {
            alert(message)
        }

        dispatch(getProducts())

        return () => {
            dispatch(reset())
          }

    }, [dispatch, isError, message])
    




    return (
        <div>
            <h1>Home Page</h1>
            <ul>
                {products.map(product => (
                    <li key={product._id}>{product.sku}</li>
                ))}
            </ul>
        </div>
    )
}

export default Home;