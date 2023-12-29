import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, reset , deleteProduct} from "../features/products/productSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
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

    const handleEdit = (productId) => {
        navigate(`/products/updateProduct/${productId}`);
    };

    const handleDelete = (productId) => {
        dispatch(deleteProduct(productId));

        //wait two seconds with alert deleted and reload page

        setTimeout(() => {
            dispatch(getProducts());
        }, 2000);
        
        navigate('/');
    };

    const handleNewProduct = () => {
        navigate("/products/addProduct");
    };

    const filteredProducts = products.filter(product =>

        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {/* <button onClick={handleSearch}>Search</button> */}
                <button onClick={handleNewProduct}>New Product</button>
            </div>
            <h2>Products</h2>
            <table>
                <thead>
                    <tr>
                        <th>SKU</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Product Description</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map(product => (
                        <tr key={product._id}>
                            <td>{product.sku}</td>
                            <td>{product.productName}</td>
                            <td>{product.quantity}</td>
                            <td>{product.productDescription}</td>
                            <td>
                                {product.images.map(image => (
                                    <img key={image} src={`/assets/${image}.png`} alt={product.productName} />
                                ))}
                            </td>
                            <td>
                                <button onClick={() => handleEdit(product._id)}>Edit</button>
                                <button onClick={() => handleDelete(product._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;