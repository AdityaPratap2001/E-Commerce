import React from 'react';
import {NavLink} from 'react-router-dom'
import './ProductBlock.css';


const ProductBlock = (props) => {
  
  return (
    <NavLink to={`/product/id/${props.item.id}`} className='product'>
      <div>
        <img alt='productImg' src={`http://localhost:8080/${props.item.pic}`}/>
        <h4><b>{props.item.seller}</b></h4>
        <h6>{props.item.name}</h6>
        <h6><b>Rs. {props.item.price}</b></h6>
      </div>
    </NavLink>
  );
}

export default ProductBlock;