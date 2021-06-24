import React, { Component } from "react";
import "./Order.css";
import OrderItem from "./OrderItem/OrderItem";

class Order extends Component {
  render() {

    let { order } = this.props;

    let data = order.productList.map((product, index) => {
      return <OrderItem key={index} product={product} />;
    });

    return (
      <div className="order">
        <div style={{display:'flex',justifyContent:'space-between'}}>
          <h6 className="orderDate">
            #Order ID: {order.orderId}
          </h6>
          <h6 className="orderDate">
            Order Date : {order.orderDate.slice(0, 10)}
          </h6>
        </div>
        {data}
        <h6 className="amtPaid">
          AMOUNT PAID : Rs. {order.orderValue}
        </h6>
      </div>
    );
  }
}

export default Order;
