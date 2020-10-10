import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import './OrderItem.css';
import ServerService from '../../../../../API/ServerService';

class OrderItem extends Component {

  state = {
    prodDetails : null,
  }

  componentDidMount(){
    // axios.get(`http://0d8c55b48a6d.ngrok.io/api/products/productId/${this.props.id}`)
    ServerService.getProductByID(this.props.id)
      .then(res => {
        // console.log(res.data);
        this.setState({prodDetails : res.data[0]});
      })
      .catch(err => {
        // console.log(err);
      })
  }

  render() {

    let data = (
      <h6>Loading...</h6>
    )
    if(this.state.prodDetails){
      data = (
        <div className='cartItem'>

          <NavLink to={`/product/id/${this.state.prodDetails.id}`}>
            <div className='cartImgCont'>
              {/* <img src={srlCartImg} alt='cartProductImg'/> */}
              <img alt='productImg' src={`data:image/jpeg;base64,${this.state.prodDetails.picByte}`} /> 
            </div>

            <div className='cartItemProp'>
              <h6 className='cartProdSeller'>{this.state.prodDetails.seller}</h6>
              <h5 className='cartProdName'>{this.state.prodDetails.name}</h5>
              <h5 className='cartProdPrice'>Rs. {this.state.prodDetails.price}</h5>
              <h6>Quantity : {this.props.qty}</h6>
            </div>
          </NavLink>

        </div>
      )
    }

    return (
      <div>
        {/* <h6>{this.props.id}</h6>
        <h6>{this.props.qty}</h6> */}
        <h6>{data}</h6>
      </div>
    );
  }
}

export default OrderItem;