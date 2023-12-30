import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'; 
import { updateProduct, getProduct } from '../../features/products/productSlice';
import { useNavigate } from 'react-router-dom';



const UpdateProduct = () => {
    const { id } = useParams(); 
    const product = useSelector(state => state.products.product); 
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [sku, setSku] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [productName, setProductName] = useState('');
    const [images, setImages] = useState(''); 
    const [imageFile, setImageFile] = useState(''); 
    const [productDescription, setProductDescription] = useState(''); 

    useEffect(() => {
        dispatch(getProduct(id));
    }, [dispatch, id]);

    useEffect(() => {
        // Set initial form values from product in Redux
        if (product) {
            setSku(product.sku);
            setQuantity(product.quantity);
            setProductName(product.productName);
            setImages(product.images); 
            setProductDescription(product.productDescription);
        }
    }, [product]);

    const handleUpdate = () => {
        // Update product through Redux
        dispatch(updateProduct({ id, sku, quantity: parseInt(quantity), productName, images, productDescription }));
        navigate('/');
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
    setImageFile(file);
    };

    return (
        <div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <div style={{ margin: '10px' }}>
                <h2 style={{ margin: '0' }}>PRODUCTS</h2>
            </div>
            <div style={{ margin: '10px' }}>
                <h3 style={{ margin: '0', color:'#001EB9' }}> <img style={{width: '15px',height: '15px',}}src="/arrow.svg" alt="arrow.svg" /> Edit product</h3>
            </div>
        </div>  <br />  <br />
        
            <form style={{ display: "flex", flexDirection: "column" }}>

            <div>
        {" "}
        <label>
          SKU
          <input
            style={{ borderRadius: "0px", marginLeft: "10px" }}
            type="text"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
          />
        </label>
        <div style={{ display: "flex", marginTop: "60px" }}>
          <label>
            Name
            <input
              style={{ borderRadius: "0px", marginLeft: "10px" }}
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </label>
          <label style={{ marginLeft: "30px" }}>
            QTY
            <input
              style={{ borderRadius: "0px", marginLeft: "10px" }}
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </label>
        </div>
        <br />
        <br /> Product Description
        <h5 style={{ color: "#8B9193", fontWeight: "500" }}>
          A small description about the product
        </h5>
        <label>
          <textarea
            style={{
              marginTop: "10px",
              borderRadius: "10px",
              width: "1078px",
              height: "105px",
              backgroundColor: "var(--f-7-f-7-f-7, #F7F7F7)",
              borderColor: "var(--f-7-f-7-f-7, #F7F7F7)",
            }}
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </label>
        <br />{" "}
      </div>
      <br /> Product Images
      <h5 style={{ color: "#8B9193", fontWeight: "500" }}>
        JPEG, PNG, SVG or GIF<br></br> (Maximum file size 50MB)
      </h5>
      <label>
        <input type="file" onChange={handleImageChange} />
      </label>{" "}
                

                <button type="button" onClick={handleUpdate}>Update</button>
            </form>
        </div>
    );
};

export default UpdateProduct;

