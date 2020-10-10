import React, { Component } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './SignUp.css';
import Spinner from '../../components/Spinner/Spinner';
import Confirmation from './Confirmation/Confirmation';
import Error from '../Login/Error/Error';
import Form from './Form';
import ServerService from '../../API/ServerService';

class SignUp extends Component {

  state = {
    loading : false,
    statusOk : null
  }

  errorReload = () =>{
    this.setState({loading : false,statusOk : null});
  }

  onSubmit = (details) =>{

    const userData = {
      firstName : details.firstName,
      lastName : details.lastName,
      username : details.email,
      password : details.password,
      confirmPassword : details.password,
      gender : details.gender,
      roles : details.user,
    }
    // console.log(userData);

    const sendData = (userData) =>{
      
      ServerService.register(userData)
        .then((response)=>{
          // console.log(response);
          // console.log(response.status);
          if(response.status === 200){
            this.setState({loading : false});
            this.setState({statusOk : true});
          }
        })
        .catch(error => {
          this.setState({statusOk : false});
          // console.log(error);
        })
    }
    sendData(userData);

    this.setState({loading : true});
  }

  render() {

    if(this.state.statusOk){
      return(
        <div>
          <Navbar/>
          <div className='backdrop'>
            <div className='signup_box confirmation_box'>
              <Confirmation content="We've sent you an confirmation link!"/>
            </div>
          </div>
        </div>
      )
    }
    if(this.state.statusOk === false){
      return(
        <div>
          <Navbar/>
          <div className='backdrop'>
            <div className='signup_box error_box'>
              <Error reload={this.errorReload} showExtraText={false} content='Something went wrong!'/>
            </div>
          </div>
        </div>
      )
    }
    
    if(this.state.loading){
      return(
        <div>
          <Navbar shadow={false}/>
          <div className='backdrop'>
            <div className='signup_box'>
              <Spinner/>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div>
        <Form submitHandler={this.onSubmit}/>
      </div>
    );
  }
}

export default SignUp;