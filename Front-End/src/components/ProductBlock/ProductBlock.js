import React from 'react';
import {NavLink} from 'react-router-dom'
import './ProductBlock.css';


const ProductBlock = (props) => {
  
  // console.log(props);
  return (
    <NavLink to={`/product/id/${props.item.id}`} className='product'>
      <div>
        {/* <img className='product_img' src={props.item.picByte} alt='productImg'/> */}
        <img alt='productImg' src={`data:image/png[jpg];base64,${props.item.picByte}`}/>
        {/* <img className='product_img' src={src} alt='productImg'/> */}
        {/* <img src={`data:image/jpeg;base64,${props.item.picByte}`} /> */}
        <h4><b>{props.item.seller}</b></h4>
        <h6>{props.item.name}</h6>
        <h6><b>Rs. {props.item.price}</b></h6>
      </div>
    </NavLink>
  );
}

export default ProductBlock;