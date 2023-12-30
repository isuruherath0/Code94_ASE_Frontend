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

    // wait two seconds with alert deleted and reload page
    setTimeout(() => {
      dispatch(getProducts());
    }, 2000);

    navigate('/');
  };

  const handleImageClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' , marginRight : '20px' }}>
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
            <td
              className="sku"
              onClick={() => handleImageClick(product._id)}
              style={{ color: '#969191', textAlign: 'center' }}
            >
              {product.sku}
            </td>
            <td>
              <center>
                <img
                  key={product.images}
                  src={`/${product.images || 'image.png'}`}
                  alt={` ${product.productName}`}
                  onError={(e) => {
                    e.target.src = 'assets/image.png';
                  }}
                  onClick={() => handleImageClick(product._id)}
                  style={{
                    width: '60px',
                    height: '60px',
                    cursor: 'pointer',
                    marginTop: '10px',
                    marginBottom: '10px'
                  }}
                />
              </center>
            </td>
            <td
              className="product-name"
              onClick={() => handleImageClick(product._id)}
              style={{ color: '#162427', textAlign: 'center' }}
            >
              {product.productName}
            </td>
            <td className="quantity" style={{ color: '#162427', textAlign: 'center' }}>
              {product.quantity}
            </td>
            <td style={{ width: '100px'  }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  <tr >
                    <td style={{ padding: '0', textAlign: 'center' }}>
                      <button
                        onClick={() => handleEdit(product._id)}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                      >
                        <img src="/edit-icon.svg" alt="Edit" style={{ width: '20px', height: '20px' }} />
                      </button>
                    </td>

                    <td style={{ padding: '0', textAlign: 'center' }}>
                      <button
                        onClick={() => handleDelete(product._id)}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                      >
                        <img src="/delete-icon.svg" alt="Delete" style={{ width: '20px', height: '20px' }} />
                      </button>
                    </td>

                    <td style={{ padding: '0', textAlign: 'center' }}>
                      <button
                        onClick={() => handleToggleFavorite(product._id)}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                      >
                        {product.favourite ? (
                          <img src="/starred.svg" alt="Favorite" style={{ width: '20px', height: '20px' }} />
                        ) : (
                          <img src="/star.svg" alt="Add to Favorites" style={{ width: '20px', height: '20px' }} />
                        )}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>

          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
