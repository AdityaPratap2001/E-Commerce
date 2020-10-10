import React, { Component } from 'react';
import Spinner from '../../components/Spinner/Spinner';
import Navbar from '../../components/Navbar/Navbar';
import './Login.css';
import LoginForm from './LoginForm';
import Error from './Error/Error';
import { Redirect } from 'react-router-dom';
import ServerService from '../../API/ServerService';
import Confirmation from '../SignUp/Confirmation/Confirmation';
import '../SignUp/Confirmation/Confirmation.css';

class Login extends Component {

  state = {
    loading : false,
    error: false,
    wrongEmail : null,
    notVerified : null,
    redirect : null,
    sentMail : null,
  }

  errorReload = () =>{
    this.setState({loading : false,error : false,notVerified : false,wrongEmail : false});
  }

  onSubmit = (details) =>{

    const userData = {
      username : details.email,
      password : details.password
    }
    
    // console.log('Userdata : ' +userData);

    const sendData = (userData) =>{

      ServerService.login(userData)
        .then((response)=>{
          // console.log(response);
          // console.log(response.data.jwt);
          if(response.status === 200){
            if(response.data !== 'Not Verified!'){

              localStorage.clear();
              localStorage.setItem('token',response.data.jwt);
              localStorage.setItem('username',userData.username);

              ServerService.fetchDetailsByUserID(userData.username)
                .then(res => {
                  // console.log(res);
                  if(res.data.roles === 'Seller'){
                    this.setState({loading : false});
                    this.setState({redirect : '/Seller'});
                    localStorage.setItem('role','seller');
                  }
                  else{
                    this.setState({loading : false});
                    this.setState({redirect : '/'});
                  }
                })
                .catch(err => {
                  // console.log(err);
                })
              
              
            }
            else{
              this.setState({notVerified : true});
              this.setState({loading : false});
            }
          }
        })
        .catch(error => {
          this.setState({error : true})
          // console.log(error);
        })
    }
    sendData(userData);

    this.setState({loading : true});
  }

  sendPass = (email) => {
    if(email === null || email==='' || email===' '){
      alert('Enter emailID!');
      return
    }
    this.setState({loading : true});
    ServerService.userForgotPassword(email)
      .then(res => {
        // console.log(res);
        if(res.status === 200){
          this.setState({loading : false , sentMail : true});
          // alert('Mail sent to your registered E-mail!');
        }
      })
      .catch(err => {
        // console.log(err);
        this.setState({loading : false , wrongEmail : true})
      })
  }

  render() {

    if(this.state.sentMail){
      return(
        <div>
          <Navbar/>
          <div className='backdrop'>
            <div className='signup_box confirmation_box'>
              <Confirmation content="We've sent you an email!"/>
            </div>
          </div>
        </div>
      )
    }
    
    if(this.state.redirect){
      return <Redirect to={this.state.redirect}/>
    }

    if(this.state.wrongEmail){
      return(
        <div>
          <Navbar shadow={false}/>
          <div className='backdrop'>
            <div className='signup_box error_box'>
              <Error reload={this.errorReload} showExtraText={false} content="Couldn't find any account linked to that E-mail!"/>
            </div>
          </div>
        </div>
      )
    }

    if(this.state.error){
      return(
        <div>
          <Navbar shadow={false}/>
          <div className='backdrop'>
            <div className='signup_box error_box'>
              <Error reload={this.errorReload} showExtraText={false} content="Username & password doesn't match"/>
            </div>
          </div>
        </div>
      )
    }

    if(this.state.notVerified){
      return(
        <div>
          <Navbar/>
          <div className='backdrop'>
            <div className='signup_box error_box'>
              <Error reload={this.errorReload} showExtraText={true} content="Your account has not yet been verified!"/>
            </div>
          </div>
        </div>
      )
    }

    if(this.state.loading){
      return(
        <div>
          <Navbar/>
          <div className='backdrop'>
            <div className='login_box'>
              <Spinner/>
            </div>
          </div>
        </div>
      )
    }
    return(
      <div>
        <LoginForm forgot={this.sendPass} submitHandler={this.onSubmit}/>
      </div>
    )
  }
}

export default Login;
