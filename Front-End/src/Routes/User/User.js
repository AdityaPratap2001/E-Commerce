import React, { Component } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import {NavLink, Redirect} from 'react-router-dom';
import loadSrc from '../../assets/loader2.gif';
import './User.css';
import ServerService from '../../API/ServerService';
import ProfileDetails from './ProfileDetails/ProfileDetails';
import ChangePassword from './ChangePassword/ChangePassword';
import PastOrders from './PastOrders/PastOrders';
import CustomAlert from '../../components/CustomAlert/CustomAlert';

class User extends Component {

  state = {
    details : false,
    userName : 'Username',
    redirect : null,
    showPopup : null,
    popupData : null,
    popupColor : null,
  }

  componentDidMount(){
    let userId = localStorage.getItem('username');
    let role = localStorage.getItem('role');
    if(role !== null){
      this.setState({redirect : '/'});
    }

    ServerService.fetchDetailsByUserID(userId)
      .then(res => {
        // console.log(res);
        this.setState({details : res.data});
        this.setState({userName : this.state.details.firstName});
      })
      .catch(err => {
        // console.log(err);
      })
    
    if(userId === null){
      this.setState({redirect : '/'});
    }
  }

  submit = (newPass) => {
    // alert('ksdlnkd');
    let userId = localStorage.getItem('username');
    let newPassDetails = {
      username : userId,
      password : newPass.old_password,
      newPassword : newPass.password,
      newConfirmPassword : newPass.confirm_password
    }
    // console.log(newPassDetails);

    ServerService.changePassword(newPassDetails)
      .then(res => {
        // console.log(res);
        if(res.status === 200){
          this.setState({showPopup : true,popupData : 'Password changed successfully!',popupColor : 'success'});
        }
      })
      .catch(err => {
          this.setState({showPopup : true,popupData : 'You entered wrong old password!',popupColor : 'danger'});
      })
  }

  hidePopup = () => {
    this.setState({showPopup : null});
  }

  logOut = (e) => {
    localStorage.clear();
    this.setState({redirect : '/'});
  }

  render() {

    if(this.state.redirect){
      return <Redirect to={this.state.redirect}/>
    }
    let showPopup = null;
    if(this.state.showPopup){
      showPopup = (
        <CustomAlert hidePop={this.hidePopup} color={this.state.popupColor} content={this.state.popupData}/>
      )
    }

    let data = (
      <div className='wishLoader'>
        <img src={loadSrc} alt='Loader'/>
      </div>
    )
    let data2 = data;

    if(this.state.details){
      let wishItems = this.state.details.wishlist.split(';');
      let wishNum = wishItems.length - 1;
      let cartItems = this.state.details.cart.split(';');
      let cartNum = cartItems.length - 1;

      data = (
        <ProfileDetails detail={this.state.details} showExtra={true} wishElem={wishNum} cartElem={cartNum}/>
      )

      data2 = (
        <div className='productForm'>
          <div className="accordion" id="accordionExample">
            <div className="card">
              <div className="card-header" id="headingOne">
                <h2 className="mb-0">
                  <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Click to change your password!
                  </button>
                </h2>
              </div>

              <div id="collapseOne" className="collapse collapseForm" aria-labelledby="headingOne" data-parent="#accordionExample">
                <div className="card-body">
                  <ChangePassword submitHandler={this.submit}/>
                </div>
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
        <div className='wishlistContainer'>
          
          <div className='accountBlock'>
            
            <div className='user'>
              <i className="fas fa-2x fa-user-circle"></i>
              <div className='helloUser'>
                <h6 className='hello'>Hello,</h6>
                <h6 className='username'>{this.state.userName}</h6>
              </div>
            </div>
            
            <div className='accountLinks'>
              <NavLink to='/user'>
                <i className="fas fa-user-cog"></i>
                Profile Details
              </NavLink>
              <NavLink to='/wishlist'>
                <i className="fas fa-heart"></i>
                My Wishlist
              </NavLink>
              <NavLink to='/cart'>
                <i className="fas fa-shopping-cart"></i>
                My Cart
              </NavLink>
            </div>

            <div className='logoutBtn'>
              <button type="button" onClick={this.logOut} className="btn btn-dark logoutButton">
                Logout
              </button>
            </div>

          </div>

          <div className='rightDisplay'>
            
            <div>
              <h5 className='myWishlist'>Profile Details</h5>
              {data}
            </div>
            
            <div className='sellYourOwn'>
              <h5>Secure your account</h5>
              {data2}
            </div>

          </div>
         
          <div className='searchForSeller'>
            <PastOrders/>
          </div>
          

        </div>
      </div>
    );
  }
}

export default User;