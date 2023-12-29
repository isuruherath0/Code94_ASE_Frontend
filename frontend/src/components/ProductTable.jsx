import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteProduct, getProducts } from '../features/products/productSlice';
import { useNavigate } from 'react-router-dom';
import '../css/ProductTable.css';


const ProductTable = ({ products }) => {

        const dispatch = useDispatch();
        const navigate = useNavigate();


        const handleToggleFavorite = async (productId) => {
                try {
                        const response = await fetch(`http://localhost:3000/api/product/favourite/${productId}`, {
                                method: 'PUT',
                                headers: {
                                        'Content-Type': 'application/json'
                                }
                        });

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

        const handleImageClick = (productId) => {
                navigate(`/products/${productId}`);
        };

        return (
            <table>
              <thead>
                <tr>
                  <th>SKU</th>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td className="sku" onClick={() => handleImageClick(product._id)}>
                      {product.sku}
                    </td>
                    <td>
                      <center><img
                        key={product.images}
                        src={`/${product.images || 'image.png'}`}
                        alt={` ${product.productName}`}
                        onError={(e) => {
                          e.target.src = 'assets/image.png';
                        }}
                        onClick={() => handleImageClick(product._id)}
                        className="product-image"
                      />
                      </center>
                    </td>
                    <td className="product-name" onClick={() => handleImageClick(product._id)}>
                      {product.productName}
                    </td>
                    <td className="quantity">{product.quantity}</td>
                    <td>
                      <button onClick={() => handleEdit(product._id)}>
                        <img src="/edit-icon.svg" alt="Edit" />
                      </button>
                      <button onClick={() => handleDelete(product._id)}>
                        <img src="/delete-icon.svg" alt="Delete" />
                      </button>
                      <button onClick={() => handleToggleFavorite(product._id)}>
                        {product.favourite ? (
                          <img src="/starred.svg" alt="Favorite" />
                        ) : (
                          <img src="/star.svg" alt="Add to Favorites" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          );
        };
export default ProductTable;
