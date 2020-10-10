import React, { Component } from 'react';
import ServerService from '../../../API/ServerService';
import noSellerDataImg from '../../../assets/noSellerData.png';
import './SellerProducts.css';
import SellerProductItem from './SellerProductItem/SellerProductItem'; 

class SellerProducts extends Component {

  state = {
    data : null,
    isEmpty : null,
    loading : null,
  }

  componentDidMount(){
    let userID = localStorage.getItem('username');
    ServerService.searchBySellerID(userID)
      .then(res => {
        this.setState({loading : false});
        // console.log(res.data);
        if(res.data.length === 0){
          this.setState({isEmpty : true});
        }
        else{
          this.setState({data : res.data});
        }
      })
      .catch(err => {
        // console.log(err);
      })
  }

  render() {
    let results = null;
    if(this.state.data){
      results = (
        // <div className='sellerSearchResults'>
          // {
            this.state.data.map((item,index) => {
              return <SellerProductItem key={index} item={item}/>
            })
          // }
        // </div>
      )
    }
    if(this.state.isEmpty){
      results = (
        <img src={noSellerDataImg} alt='noDetailsAvailable' style={{width : '50%',marginLeft : '25%'}}/>
      )
    }
    
    return (
      <div>
        {results}
      </div>
    );
  }
}

export default SellerProducts;