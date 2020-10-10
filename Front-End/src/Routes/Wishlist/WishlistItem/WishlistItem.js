import React, { Component } from 'react';
import '../Wishlist.css';
import { NavLink } from 'react-router-dom';
import ServerService from '../../../API/ServerService';


class WishlistItem extends Component {

  state = {
    loadedData : null,
    classes : 'show', 
  }

  // componentDidMount(){
  //   console.log(this.props.id);
  //   ServerService.getProductByID(this.props.id)
  //     .then(res => {
  //       console.log(res);
  //       this.setState({loadedData : res.data[0]});
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  // }

  // componentWillReceiveProps(arg){
  //   console.log('Arg==='+arg.id);
  //   console.log('in wishlistItem : ' + this.props.id +' ' + this.props.index);
  //   ServerService.getProductByID(arg.id)
  //     .then(res => {
  //       console.log(res);
  //       this.setState({loadedData : res.data[0]});
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  // }

  componentDidUpdate(){
    ServerService.getProductByID(this.props.id)
      .then(res => {
        // console.log(res);
        this.setState({loadedData : res.data[0]});
      })
      .catch(err => {
        // console.log(err);
      })
  }

  removeWish = () => {
    let userId = localStorage.getItem('username');
    let productData = {
      username : userId,
      productId : this.props.id
    }
    // console.log(productData);
    
    ServerService.removeFromWishlist(productData)
    .then(response => {
      // alert('Item Deleted!');

      // this.setState({classes : 'hide'});
      // console.log('Removing : '+this.props.index);
      this.props.remove(this.props.index);
      // window.location.reload();
    })
    .catch(error => {
      // console.log(error);
    })
  }

  render() {
    let showData = (
      <div>
        Loading...
      </div>
    )
    if(this.state.loadedData){
      showData = (
          <div className='wishContainer'>
            <NavLink to={`/product/id/${this.state.loadedData.id}`}>
              <div className='wishlistItemImage'>
                {/* <img src={imgSRC} alt='product_Img'/> */}
                <img alt='productImg' src={`data:image/png[jpg];base64,${this.state.loadedData.picByte}`}/>
              </div>
              <div className='alongImg'>
                <h6 className='prodSeller'>{this.state.loadedData.seller}</h6>
                <h5 className='prodName'>{this.state.loadedData.name}</h5>
                <h5 className='prodPrice'>Rs. {this.state.loadedData.price}</h5>
                <h6 className='prodMat'>Material : {this.state.loadedData.material}</h6>  
                <h6 className='prodFit'>Fit : {this.state.loadedData.fit}</h6>
              </div>
            </NavLink>
              {/* <button type="button" className="removeWish btn btn-danger">Remove Item</button> */}
              <i onClick={this.removeWish} className=" removeWish fas fa-trash-alt"></i>
            
          </div>
      )
    }

    return (
      <div className={`wishlistItem ${this.state.classes}`}>
        {showData}
      </div>
    );
  }
}

export default WishlistItem;