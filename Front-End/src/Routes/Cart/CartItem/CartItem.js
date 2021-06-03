import React, { Component } from "react";
import "../Cart.css";
import { NavLink } from "react-router-dom";
import ServerService from "../../../API/ServerService";

class CartItem extends Component {
  
  removeFromCart = (index,productID) => {

    let userId = localStorage.getItem("username");
    let productData = {
      username: userId,
      productId: productID,
    };

    ServerService.removeFromCart(productData)
      .then((res) => {
        // console.log(res);
        this.props.removeCartItem(index);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  moveToWishlist = (index,productID) => {
    
    let userId = localStorage.getItem("username");
    let productData = {
      username: userId,
      productId: productID,
    };

    ServerService.moveFromCartToWishlist(productData)
      .then((res) => {
        console.log(res);
        this.props.removeCartItem(index);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {

    let { productData } = this.props; 

    let data3 = (
      <button
        onClick={() => this.moveToWishlist(this.props.index,productData.product._id)}
        type="button"
        className="btn btn-danger"
      >
        Move to Wishlist
      </button>
    );
    if (productData.isInMyWishlist) {
      data3 = null;
    }

    var weekDate = new Date();
    weekDate.setDate(weekDate.getDate() + 7);
    weekDate = weekDate.toDateString();

    let data = <div className="cartItem">Loading...</div>;
    
    if (productData !== null && productData !== undefined) {
      data = (
        <div className="cartItem">
          <NavLink to={`/product/id/${productData.product._id}`}>
            <div className="cartImgCont">
            <img
                src={`http://localhost:8080/${productData.product.imageUrl}`}
                alt="product_Img"
              />
            </div>
          </NavLink>

          <div className="cartItemProp">
            <h6 className="cartProdSeller">{productData.product.brand}</h6>
            <h5 className="cartProdName">{productData.product.name}</h5>
            <h5 className="cartProdPrice">Rs. {productData.product.price}</h5>
            <h6>Quantity : {productData.quantity}</h6>
           
            {data3}
          </div>

          <div className="cartItemDelete">
            <h6 style={{ marginBottom: "0px" }}>Delivery by : {weekDate}</h6>
            <h6>7 day replacement policy</h6>
            <i className="fas fa-trash-alt" onClick={() => this.removeFromCart(this.props.index,productData.product._id)}></i>
          </div>
        </div>
      );
    }

    return <div>{data}</div>;
  }
}

export default CartItem;
