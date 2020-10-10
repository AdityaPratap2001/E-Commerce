import React, { Component } from 'react';
import ProfileEditForm from './ProfileEditForm/ProfileEditForm';
import './ProfileDetails.css';
import ServerService from '../../../API/ServerService';

class ProfileDetails extends Component {

  state = {
    edit : null,
  }

  editDetails = () => {
    this.setState({edit : true});
  }

  closeForm = () => {
    this.setState({edit : false});
  }

  handleSubmit = (newDetails) => {
    let userID = this.props.detail.username;
    let newdetails = {
      username : userID,
      firstName : newDetails.firstName,
      lastName : newDetails.lastName,
      gender : newDetails.gender
    }

    ServerService.editProfileDetails(newdetails)
     .then(res => {
      //  console.log(res);
       if(res.status === 200){
         window.location.reload();
       }
     })
     .catch(err => {
      //  console.log(err);
     })
  }

  render() {

    if(this.state.edit){
      return (
        <div className='userDetailsDisplay'>
          <ProfileEditForm closeForm={this.closeForm} submitHandler={this.handleSubmit}/>
        </div>
      )
    }

    let extraData = (
      <div className='userDetailsDisplay'>
        
        <h6 className = 'editProf' onClick={this.editDetails}>Edit Details</h6>
        
        <div>
          <div>First-Name : </div>
          <div className='details'>{this.props.detail.firstName}</div>
        </div>
        <div>
          <div>Last-Name : </div>
          <div className='details'>{this.props.detail.lastName}</div>
        </div>
        <div>
          <div>Gender : </div>
          <div className='details gender'>{this.props.detail.gender}</div>
        </div>
        <div>
          <div>Registered Email :</div>
          <div className='details'>{this.props.detail.username}</div>
        </div>
      </div>
    );
    if(this.props.showExtra){
      extraData = (
        <div className='userDetailsDisplay'>
        
        <h6 className = 'editProf' onClick={this.editDetails}>Edit Details</h6>
        
        <div>
          <div>First-Name : </div>
          <div className='details'>{this.props.detail.firstName}</div>
        </div>
        <div>
          <div>Last-Name : </div>
          <div className='details'>{this.props.detail.lastName}</div>
        </div>
        <div>
          <div>Gender : </div>
          <div className='details gender'>{this.props.detail.gender}</div>
        </div>
        <div>
          <div>Registered Email :</div>
          <div className='details'>{this.props.detail.username}</div>
        </div>
        <div> 
          <div>Items in Wishlist :</div>
          <div className='details'>{this.props.wishElem}</div>
        </div>
        <div>
          <div>Items in Cart :</div>
          <div className='details'>{this.props.cartElem}</div>
        </div>
      </div>
      )
    }

    return (
      extraData
    );
  }
}

export default ProfileDetails;