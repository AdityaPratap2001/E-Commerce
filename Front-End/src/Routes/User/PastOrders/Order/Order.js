import React, { Component } from 'react';
import './Order.css';
import OrderItem from './OrderItem/OrderItem';

class Order extends Component {

  state = {
    prodId : null,
    prodQuantity : null,
  }

  componentDidMount(){
    // console.log(this.props.details);
    let prodIdArray = this.props.details.cart.split(';');
    let prodQtyArray = this.props.details.cartProdQty.split(';');
    this.setState({prodId : prodIdArray , prodQuantity : prodQtyArray});
  }

  render() {

    let data= (
      <h6>Loading...</h6>
    )
    if(this.state.prodId){
      data = (
        this.state.prodId.map((item,index) => {
          if(index !== (this.state.prodId.length-1)){
            return <OrderItem key={index} id={item} qty={this.state.prodQuantity[index]}/>
          }
          else{
            return null
          }
        })
      )
    }

    let totalAmt = this.props.details.billingAmt + 50;
    let orderDate = this.props.details.createdDate.slice(0,10);
    let newDate = [];
    for(let i in orderDate){
      if(i == 8 || i == 9){
        newDate.push('1');
      }
      else{
        newDate.push(orderDate[i]);
      }
    }

    return (
      <div className='order'>
        <h6 className='orderDate'>ORDER DATE : {newDate}</h6>
        {data}
        <h6 className='amtPaid'>AMOUNT PAID : Rs. {totalAmt}</h6>
      </div>
    );
  }
}

export default Order;