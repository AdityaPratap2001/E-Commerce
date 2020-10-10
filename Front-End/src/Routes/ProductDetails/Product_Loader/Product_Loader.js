import React from 'react';
import './Product_Loader.css';
import loaderSRC from '../../../assets/loader2.gif'; 

const Product_Loader = (props) => {
  return (
    <div className='Product_loader'>
      <img src={loaderSRC} alt='loader'/>
    </div>
  );
}

export default Product_Loader;