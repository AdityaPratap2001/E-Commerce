import React, { Component } from 'react';
import src1 from '../../assets/login8.jpg';
import src2 from '../../assets/login6.jpg';
import src3 from '../../assets/login7.jpg';
import logoSrc from '../../assets/log.png'
import Navbar from '../../components/Navbar/Navbar';
import {Link} from 'react-router-dom';
import './Login.css';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class LoginForm extends Component {

  state = {
    email: null,
    password: null,
    formErrors: {
      email: "",
      password: "",
    }
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      this.props.submitHandler(this.state);
    } 
    else {
      // console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value });
  };

  forgotPass = () => {
    this.props.forgot(this.state.email);
  }

  render() {

    const { formErrors } = this.state;

    return (
      <div>
          <Navbar/>
          <div className='backdrop'>
            <div className='login_box'>
              <div className='slideshow'>
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                  <ol className="carousel-indicators indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                  </ol>
                  <div className="carousel-inner carousel_size">
                    <div className="carousel-item active">
                      <img className="d-block w-100" src={src1} alt="First slide"/>
                    </div>
                    <div className="carousel-item">
                      <img className="d-block w-100" src={src2} alt="Second slide"/>
                    </div>
                    <div className="carousel-item">
                      <img className="d-block w-100" src={src3} alt="Third slide"/>
                    </div>
                  </div>
                  <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                  </a>
                  <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                  </a>
                </div>
              </div>
              
              <div className='login'>
                <img src={logoSrc} alt='logo'/>
                <h6>Welcome to Click N Ship!</h6>
                <form onSubmit={this.handleSubmit}>

                  <h5>E-Mail :</h5><br></br>
                  <input 
                    type='email'
                    className={formErrors.email.length > 0 ? "error" : null} 
                    name='email'
                    placeholder='Enter your email'
                    onChange={this.handleChange}
                    required
                  />
                  {formErrors.email.length > 0 && (
                    <span className="errorMessage">{formErrors.email}</span>
                  )}

                  <h5>Password :</h5><br></br>
                  <input 
                    type='password'
                    className={formErrors.password.length > 0 ? "error" : null} 
                    name='password'
                    placeholder='Password'
                    onChange={this.handleChange}
                    required
                  />
                  <h4 className='forgotPass' onClick={this.forgotPass}>Forgot password?</h4>
                  
                  {formErrors.password.length > 0 && (
                    <span className="errorMessage">{formErrors.password}</span>
                  )}

                  
                  <button type='submit'>Sign In</button>
                  <Link to='/userSignup'className='link'>
                    <h4>Create a new account?</h4>
                  </Link>
                </form>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default LoginForm;