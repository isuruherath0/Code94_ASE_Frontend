import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../features/products/productSlice";
import { useNavigate } from "react-router-dom";

const AddProductForm = () => {
  const [sku, setSku] = useState("");
  const [quantity, setQuantity] = useState("");
  const [productName, setProductName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [productDescription, setProductDescription] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      sku,
      quantity: parseInt(quantity),
      productName,
      images: imageFile ? imageFile.name : "",
      productDescription,
    };

    dispatch(createProduct(newProduct));

    setSku("");
    setQuantity("");
    setProductName("");
    setImageFile(null);
    setProductDescription("");

    navigate("/");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column" }}
    >
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
      <button
        style={{ width: "249px", borderRadius: "10px", marginLeft: "830px" }}
        type="submit"
      >
        Add product
      </button>
    </form>
  );
};

export default AddProductForm;
