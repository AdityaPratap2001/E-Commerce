import React, { Component } from 'react';
import ServerService from '../../../API/ServerService';
import './PastOrders.css';
import Order from './Order/Order';
import emptySrc from '../../../assets/emptyPastOrders.png';

class PastOrders extends Component {
  
  state = {
    loading : true,
    pastOrders : null,
    isEmpty : null
  }

  componentDidMount(){
    let userID = localStorage.getItem('username');
    ServerService.getPastOrders(userID)
      .then(res => {
        // console.log(res);
        this.setState({pastOrders : res.data , loading : false});
        // console.log(this.state.pastOrders);
        if(this.state.pastOrders.length === 0){
          // console.log('No past Orders!');
          this.setState({isEmpty : true});
        }
      })
      .catch(err => {
        // console.log(err);
      })
  }

  render() {

    let data = null;
    if(this.state.pastOrders){
      data = (
        this.state.pastOrders.map((order,index) => {
          return <Order key={index} details={order}/>
        })
      )
    }

    if(this.state.isEmpty){
      data = (
        <div className='noOrders'>
          <img src={emptySrc} alt='No items ordered yet!' style={{width : '50%'}}/>
        </div>
      )
    }

    return (
      <div className='pastOrders'>
        <h5 className='orderHeading'>Order History</h5>
        {data}
      </div>
    );
  }
}

export default PastOrders;