import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./OrderItem.css";
import ServerService from "../../../../../API/ServerService";

class OrderItem extends Component {
  
  render() {

    let productData = this.props.product;

    let data = (
      <div className="cartItem">
        <NavLink to={`/product/id/${productData.product._id}`}>
          <div className="cartImgCont">
            <img
              alt="productImg"
              src={`http://localhost:8080/${productData.product.imageUrl}`}
            />
          </div>

          <div className="cartItemProp">
            <h6 className="cartProdSeller">{productData.product.brand}</h6>
            <h5 className="cartProdName">{productData.product.name}</h5>
            <h5 className="cartProdPrice">
              Rs. {productData.product.price}
            </h5>
            <h6>Quantity : {productData.quantity}</h6>
          </div>
        </NavLink>
      </div>
    );

    return (
      <div>
        <h6>{data}</h6>
      </div>
    );
  }
}

export default OrderItem;
