import React, { Component } from "react";
import "../Wishlist.css";
import { NavLink } from "react-router-dom";
import ServerService from "../../../API/ServerService";

class WishlistItem extends Component {
  state = {
    classes: "show",
  };

  removeFromWishlist = (index, productID) => {
    let userId = localStorage.getItem("username");
    let productData = {
      username: userId,
      productId: productID,
    };

    // // console.log(productData);
    ServerService.removeFromWishlist(productData)
      .then((res) => {
        console.log(res);
        this.props.removeItem(this.props.index);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    let { product } = this.props;

    let showData = <div>Loading...</div>;
    if (product !== null && product !== undefined) {
      showData = (
        <div className="wishContainer">
          <NavLink to={`/product/id/${product._id}`}>
            <div className="wishlistItemImage">
              <img
                src={`http://localhost:8080/${product.imageUrl}`}
                alt="product_Img"
              />
            </div>
            <div className="alongImg">
              <h6 className="prodSeller">{product.brand}</h6>
              <h5 className="prodName">{product.name}</h5>
              <h5 className="prodPrice">Rs. {product.price}</h5>
              <h6 className="prodMat">Material : {product.material}</h6>
              <h6 className="prodFit">Fit : {product.fit}</h6>
            </div>
          </NavLink>

          <i
            onClick={() => this.removeFromWishlist(this.props.index, product._id)}
            className=" removeWish fas fa-trash-alt"
          ></i>
        </div>
      );
    }

    return (
      <div className={`wishlistItem ${this.state.classes}`}>{showData}</div>
    );
  }
}

export default WishlistItem;
