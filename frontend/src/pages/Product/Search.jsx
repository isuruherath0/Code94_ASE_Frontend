import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, reset ,} from "../../features/products/productSlice";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ProductHeader from "../../components/ProductHeader";
import "../../css/Search.css";


const Search= () => {

    
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
                <ProductHeader title="Products"/>
                <p style={{ fontSize: "20px", fontWeight: "bold" }}>{filteredProducts.length} results found for '{id}'</p>
                <ul>
                    {filteredProducts.map((product) => (
                        <li key={product._id}>
                            <table>
                                 <tbody>
                                    <tr>
                                        <td></td>
                                        <td>
                                            <div>
                                                <p style={{ color: "#001EB9" ,fontSize: "16px"}}>{product.sku}</p>
                                                <p style={{ color: "#162427" , fontSize: "18px", fontWeight: "bold" }}>{product.productName}</p>
                                                 <p style={{ color: "##969191" , fontSize: "10px"}}>{product.productDescription}</p>
                                             </div>
                                        </td>
                                        <td> <button onClick={() => navigate(`/products/${product._id}`)}>
                                                 <img src="/arrow.svg" alt="Go" />
                                            </button>
                                         </td>
                                    </tr>
                                </tbody>
                            </table>
                        </li>
                    ))}
                </ul>


            </div>
        );
};

export default Search;
