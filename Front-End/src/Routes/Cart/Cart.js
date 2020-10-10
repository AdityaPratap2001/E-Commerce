import React, { Component } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import loadSrc from '../../assets/loader2.gif';
import CartItem from './CartItem/CartItem';
import './Cart.css';
import transactionSrc from '../../assets/transaction2.gif';
import emptyImg from '../../assets/emptyCart.png';
import ServerService from '../../API/ServerService';
import { Redirect } from 'react-router-dom';

class Cart extends Component {

  state = {
    list : null,
    isEmpty : null,
    transactionComplete : null,
    loading : null,
    redirect : null,
  }

  componentDidMount(){
    let userId = localStorage.getItem('username');
    let role = localStorage.getItem('role');
    if(role !== null){
      this.setState({redirect : '/'});
    }
    
    ServerService.fetchCartDetailsByID(userId)
      .then(res => {
        // console.log(res);
        if(res.data.length === 1){
          this.setState({isEmpty : true})
        }
        else{
          this.setState({list : res.data});
        }
      })
      .catch(err => {
        // console.log(err);
      })
  }
  
  placeOrder = () => {
    let userId = localStorage.getItem('username');
    // console.log(userId);
    this.setState({loading : true});
    ServerService.placeOrder(userId)
      .then(res => {
        // console.log(res);
        if(res.status === 200){
          // alert('Order Placed!');
          this.setState({loading : false});
          this.setState({transactionComplete : true});
          // setTimeout(function(){
          //   window.location.reload();
          // },4000)
        }
      })
      .catch(err => {
        // console.log(err);
      })
  }

  transactionCompleted = () => {
    this.setState({transactionComplete : null,list : null,isEmpty : true});
  }

  render() {

    if(this.state.redirect){
      return <Redirect to='/'/>
    }

    if(this.state.list){
      if(this.state.list.length > 1){
        var cartItems = (
          <div>
            {
              this.state.list.map((cartItem,index) => {
                if(index !== (this.state.list.length-1) ){
                  return <CartItem key={index} item={cartItem}/>
                }
                else{
                  return null;
                }
              })
            }
          </div>
        )
      }
    }

    // var weekDate = new Date();
    // var options = {weekday : 'long',month : 'long',day : 'numeric'};
    // weekDate.setDate(weekDate.getDate() + 7);
    // weekDate.toString(options);
    var weekDate = new Date();
    weekDate.setDate(weekDate.getDate() + 7);
    weekDate = weekDate.toDateString();

    let data = (
      <div className='wishLoader'>
        <img src={loadSrc} alt='Loader'/>
      </div>
    )
    if(this.state.isEmpty){
      data = (
        <div className='emptyImg'>
          <img src={emptyImg} alt='cartEmpty'></img>
        </div>
      )
    }
    if(this.state.list){
      data = (
        <div className='cart'>
          
          <div className='cartItems'>
            <h5 className='myCart'>My Cart</h5>
            {cartItems}
          </div>
          
          <div className='cartValue'>
            <div className='cartValueHeader'>
              PRICE DETAILS
            </div>
            <div className='cartCharge'>
              <div>
                <div>Price ({this.state.list.length-1} items)</div>
                <div>Rs. {this.state.list[this.state.list.length - 1]}</div>
              </div>
              <div>
                <div>Delivery Charges</div>
                <div>Rs. 50</div>
              </div>
            </div>
            <div className='totalAmount'>
              <div>TOTAL AMOUNT</div>
              <div>Rs. {Number(this.state.list[this.state.list.length - 1])+50}</div>
            </div>
            <div className='deliveryBy'>
              <div>Delivery By :</div>
              {/* <div> Saturday, Oct 6</div> */}
              <div>{weekDate}</div>
            </div>
            {/* <div>  */}
            <button type="button" onClick={this.placeOrder} className="orderButton btn btn-dark">Place Order</button>
            {/* </div> */}
          </div>
        
        </div>
      )
      if(this.state.transactionComplete){
        data = (
          <div className='transaction'>
            <h5>Transaction Successful!</h5>
            <img src={transactionSrc} alt='transactionCompleted'/>
            <h6>Your Order will be delivered to you, within 7 working days</h6>
            <button onClick={this.transactionCompleted} type="button" className="btn btn-outline-dark">Back To Cart!</button>
          </div>
        )
      }
      if(this.state.loading){
        data = (
          <div className='wishLoader'>
            <img src={loadSrc} alt='Loader'/>
          </div>
        )
      }
    }

    return (
      <div>
        <Navbar shadow={true}/>
        <div className='cart_container'>

          {data}

        </div>
      </div>
    );
  }
}

export default Cart;