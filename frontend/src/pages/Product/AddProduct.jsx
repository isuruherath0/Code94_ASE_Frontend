import React, { useState } from 'react';
import AddProductForm from '../../components/AddProductForm';

function AddProduct() {

  return (
    <div>
         <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <div style={{ margin: '10px' }}>
        <h2 style={{ margin: '0' }}>PRODUCTS</h2>
      </div>
      <div style={{ margin: '10px' }}>
        <h3 style={{ margin: '0', color:'#001EB9' }}> > Add new product</h3>
      </div>
    </div>  <br />  <br />
      <AddProductForm    />



    </div>
  );
}

export default AddProduct;




