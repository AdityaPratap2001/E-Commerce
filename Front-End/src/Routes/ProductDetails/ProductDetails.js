import React, { Component } from 'react';
import './ProductDetails.css';
import Navbar from '../../components/Navbar/Navbar';
import Product_Loader from './Product_Loader/Product_Loader'; 
import { NavLink, Redirect } from 'react-router-dom';
import ServerService from '../../API/ServerService';
import CustomAlert from '../../components/CustomAlert/CustomAlert';


class ProductDetails extends Component {

  state = {
    productId : this.props.match.params.id,
    productDetails : null,
    redirect : null,
    wishlisted : null,
    addedToCart : null,
    quantity : 1,
    showPopup : null,
    popupData : null,
    popupColor : null,
  }

  componentDidMount(){
    
    ServerService.getProductByID(this.state.productId)
      .then(response => {
        // console.log(response.data[0]);
        this.setState({productDetails : response.data[0]});
      })
      .catch(error =>{
        // console.log(error)
      })

    let userId = localStorage.getItem('username');
    let productData = {
      username : userId,
      productId : this.state.productId
    }
    // console.log(productData);
    

    ServerService.doesProductExistInWishlist(productData)
      .then(res => {
        // console.log(res.data);
        if(res.data){
          this.setState({wishlisted : true});
        }
      })
      .catch(err => {
        // console.log('error');
      })


    ServerService.doesProductExistInCart(productData)
      .then(res => {
        if(res.data){
          this.setState({addedToCart : true});
        }
      })

  }

  addToWishlist = () => {
    // console.log('Wishlisted!');
    let token = localStorage.getItem('token');
    let role = localStorage.getItem('role');
    if(token === null || role !== null){
      this.setState({redirect : '/userLogin'})
    }
    else{
      
      let userId = localStorage.getItem('username');
      let productData = {
        username : userId,
        productId : this.state.productId
      }
      // console.log(productData);
      
      ServerService.addToWishlist(productData)
        .then(response => {
          // console.log(response);
          this.setState({wishlisted : true});
        })
        .catch(error => {
          // console.log(error);
        })
    }
  }
  addToCart = () => {
    // console.log('Add to cart!');
    let token = localStorage.getItem('token');
    let role = localStorage.getItem('role');
    if(token === null || role !== null){
      this.setState({redirect : '/userLogin'})
    }
    else{
      
      let userId = localStorage.getItem('username');
      let productData = {
        username : userId,
        productId : this.state.productId,
        productAmt : this.state.quantity
      }
      // console.log(productData);
      
      ServerService.addToCart(productData)
        .then(response => {
          // console.log(response);
          this.setState({addedToCart : true})
        })
        .catch(error => {
          this.setState({showPopup : true,popupData : 'Items out of stock, trying adding less quantity!',popupColor : 'danger'})
          // console.log(error);
        })
    }
  }

  removeItemFromWishlist = () => {
    // console.log('will remove from wishlist!');
    let token = localStorage.getItem('token');
    if(token === null){
      this.setState({redirect : '/userLogin'})
    }
    else{
      
      let userId = localStorage.getItem('username');
      let productData = {
        username : userId,
        productId : this.state.productId
      }
      // console.log(productData);

      ServerService.removeFromWishlist(productData)
        .then(response => {
          // console.log(response);
          this.setState({wishlisted : false});
        })
        .catch(error => {
          // console.log(error);
        })
    }
  }

  removeFromCart = () => {
    // console.log('will delete item from cart!');
    let token = localStorage.getItem('token');
    if(token === null){
      this.setState({redirect : '/userLogin'})
    }
    else{
      
      let userId = localStorage.getItem('username');
      let productData = {
        username : userId,
        productId : this.state.productId,
        productAmt : this.state.quantity
      }
      // console.log(productData);
      
      ServerService.removeFromCart(productData)
        .then(response => {
          // console.log(response);
          this.setState({addedToCart : false});
        })
        .catch(error => {
          // console.log(error);
        })
    }
  }

  hidePopup = () => {
    this.setState({showPopup : null});
  }

  qtyChange = (e) => {
    this.setState({quantity : e.target.value});
  }

  render() {

    let showPopup = null;
    if(this.state.showPopup){
      showPopup = (
        <CustomAlert hidePop={this.hidePopup} color={this.state.popupColor} content={this.state.popupData}/>
      )
    }

    let mainLink = '';
    let subLink = '';

    if(this.state.productDetails){
      switch(this.state.productDetails.category){
        case 'Men' : mainLink = 'Men';
                    break;
        case 'Women' : mainLink = 'Women';
                      break;
        case 'Kids' : mainLink = 'Kids';
                      break;
        case 'Home and Living' : mainLink = 'Home_&_Living';
                              break;
        case 'Travel Trolley' : mainLink = 'Travel_Bags';
                            break;
        default : break;
      }
      if(this.state.productDetails.subCategory){
        switch(this.state.productDetails.subCategory){
          case 'Top-wear' : subLink = 'Topwear';
                      break;
          case 'Bottom-wear' : subLink = 'Bottomwear';
                        break;
          case 'Foot-wear' : subLink = 'Footwear';
                        break;
          case 'Boys Clothing' : subLink = 'Boys';
                                break;
          case 'Girls Clothing' : subLink = 'Girls';
                              break;
          default : break;
          
        }
        if(this.state.productDetails.category === 'Kids' && this.state.productDetails.subCategory){
          if(this.state.productDetails.subCategory === 'Kids Footwear'){
            subLink = 'Footwear';
          }
          else if(this.state.productDetails.subCategory === 'Boys Clothing'){
            subLink = 'Boys';
          }
          else if(this.state.productDetails.subCategory === 'Girls Clothing'){
            subLink = 'Girls';
          }
        }
        if(this.state.productDetails.category === 'Home and Living' && this.state.productDetails.subCategory){
          if(this.state.productDetails.subCategory === 'Home Decor'){
            subLink = 'Decor';
          }
          else if(this.state.productDetails.subCategory === 'Bed and Furnishing'){
            subLink = 'Furnishing';
          }
        }
      
        if(this.state.productDetails.category === 'Travel Trolley'){
          subLink = '';
        }
      }
    }
    

    if(this.state.redirect){
      return <Redirect to={this.state.redirect}/>
    }
    
    let wishIcon = (
      <div className='heart inacttive' onClick={this.addToWishlist}>
        <i className="fas fa-heart"/>
      </div>
    )
    let wishlistButton = (
      <button type="button" onClick={this.addToWishlist} className="btn btn-outline-danger">Add to Wishlist</button>
    )

    if(this.state.wishlisted){
      wishlistButton = (
        <button type="button" onClick={this.removeItemFromWishlist} className="btn btn-outline-danger activeBtnn">Remove from Wishlist</button>
      )
      wishIcon = (
        <div className='heart acttive' onClick={this.removeItemFromWishlist}>
          <i className="fas fa-heart"/>
        </div>
      )

    }

    let cartButton = (
      <button type="button" onClick={this.addToCart} className="btn btn-outline-danger">Add to Cart</button>
    )
    if(this.state.addedToCart){
      cartButton = (
        <button type="button" onClick={this.removeFromCart} className="btn btn-outline-danger activeBtnn">Remove from Cart</button>   
      )
    }

    let data = (
      <div>
        <Product_Loader/>
      </div>
    )
    if(this.state.productDetails){
      let direct = `/category/${mainLink}`;
      let subDirect = `/category/${mainLink}/${subLink}`;
      if(this.state.productDetails.category === 'Travel Trolley'){
        subDirect =  `/category/${mainLink}`;
      }
      data = (
        <div className='productDetails'>

          <div className='productBreadcrumb'>
          <h6>
            <NavLink to='/' className='breadLink'>
              Home
            </NavLink> 
            >
            <NavLink to={direct} className='breadLink'>
              {/* {this.state.productDetails.category} */}
              {mainLink}
            </NavLink> 
            >
            <NavLink to={subDirect} className='breadLink'>
              {/* {this.state.productDetails.subCategory} */}
              {subLink}
            </NavLink>
          </h6>
          </div>
          
          <div className='productDetailsLeft'> 
            
            <div className='imgCont'>
              {/* <img className='img-fluid' src={producdImgSrc} alt='product_Img'/> */}
              {/* <img className='img-fluid' src={this.state.productDetails.picByte.data} alt='product_Img'/> */}
              {/* <img src={URL.createObjectURL(this.state.productDetails.picByte)} /> */}
              {/* <img src={`data:image/jpeg;base64,${this.state.productDetails.picByte}`} /> */}
              <img alt='productImg' src={`data:image/png[jpg];base64,${this.state.productDetails.picByte}`}/>
              {wishIcon}
            </div>
          </div>

          <div className='productDetailsRight'>
            <h6 className='seller'>{this.state.productDetails.seller}</h6>
            <h5 className='title'>{this.state.productDetails.name}</h5>
            <h6 className='specialPrice'>Special price ends in 2 days!</h6>
            <h5 className='price'>Rs.{this.state.productDetails.price}</h5>
            <h5 className='offers'>Available Offers</h5>
            <i className="tag fas fa-tag"></i>
              <h5 className='specialOffer'>Special Price Get extra 5% off (price inclusive of discount)</h5><br></br>
            <i className="tag fas fa-tag"></i>
              <h5 className='specialOffer'>Bank Offers 5% off* with Axis Bank Buzz CRedit Card</h5>
            
            <div className='Quantity'>
              <h6 className='quantity'>Quantity :</h6>
              <select className='selectQnt' onChange={this.qtyChange}>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
              </select>
            </div>
        
            
            <div className='productsButton'>
              {/* <button type="button" onClick={this.addToWishlist} class="btn btn-outline-danger">Wishlist</button> */}
              {/* <button type="button" onClick={this.addToCart} class="btn btn-outline-danger">Add to Cart</button> */}
              {wishlistButton}
              {cartButton}
            </div>
            
            <h5 className='prodHead'>Product Details</h5>
            <div style={{display : 'flex'}}>
              <div className='tableLabel'>
                <h6 className='tableLabels'>Type</h6>
                <h6 className='tableLabels'>Fit</h6>
                <h6 className='tableLabels'>Fabric</h6>
                <h6 className='tableLabels'>Sales Package</h6>
              </div>
              <div className='tableLabelData'>
                <h6 className='tableLabeldata'>{this.state.productDetails.prodType}</h6>
                <h6 className='tableLabeldata'>{this.state.productDetails.fit}</h6>
                <h6 className='tableLabeldata'>{this.state.productDetails.material}</h6>
                <h6 className='tableLabeldata'>Pack of 1</h6>
              </div>
            </div>

          </div>
        </div>
      )
    }

    return (
      <div>
        <Navbar shadow={true}/>
        {showPopup}
        <div className='displayProduct'>
          {data}
        </div>
      </div>
    );
  }
}

export default ProductDetails;