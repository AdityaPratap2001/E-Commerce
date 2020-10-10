import React, { Component } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import src3 from '../../assets/login8.jpg';
import src2 from '../../assets/login6.jpg';
import src1 from '../../assets/login7.jpg';
import {Link} from 'react-router-dom';
import './Form.css';
import './SignUp.css';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
const nameRegex = RegExp(
  /^[a-zA-Z_-]{0,30}$/
)
const lastnameRegex = RegExp(
  /^[a-zA-Z\s]+$/
)

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

class App extends Component {

  state = {
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    gender: null,
    user: null,
    formErrors: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      gender: "",
      user: "",
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
      
      // case "firstName":
      //   formErrors.firstName =
      //     value.length < 3 && value.length > 0? "minimum 3 characaters required" : "";
      //   formErrors.firstName = nameRegex.test(value)
      //     ? ""
      //     : "only characters allowed!";
      //   break;

      case "firstName":
        formErrors.firstName = (value.length < 3 && value.length > 0? "minimum 3 characaters required" : "")||
                              (formErrors.firstName = nameRegex.test(value) ? "":"only characters allowed!");
        break;
  
      case "lastName":
        let spaceNum = 0;
        for(let ch in value){
          if(value[ch] === ' '){
            spaceNum = spaceNum + 1;
          }
        }
        formErrors.lastName = (spaceNum > 1 ? "more than one space prohibited" : "")||
                              (value.length < 3 ? "minimum 3 characaters required" : "")||
                              (formErrors.lastName = lastnameRegex.test(value) ? "":"only characters allowed!");                              
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      case "gender":
        formErrors.gender =
          value.length < 3 ? "select an option" : "";
        break;
      case "user":
        formErrors.user =
          value.length < 3 ? "select an option" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value });
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div>
        <Navbar/>
        <div className='backdrop'>
          <div className='signup_box'>

            <div className='signup'>
              {/* <img src={logoSrc} alt='logo'/> */}
              
              <form className='signupFormForm' onSubmit={this.handleSubmit}>
                
                <div>
                  <div>
                    <h5>Firstname : </h5>
                    <input 
                      type='text' 
                      autoComplete='off'
                      className={formErrors.firstName.length > 0 ? "error" : null}
                      name='firstName'
                      placeholder='First Name'
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  {formErrors.firstName.length > 0 && (
                    <span className="errorMessage">{formErrors.firstName}</span>
                  )}
                </div>
          
                <div>
                  <div>
                    <h5>Lastname :</h5><br></br>
                    <input 
                      type='text'
                      autoComplete='off'
                      className={formErrors.lastName.length > 0 ? "error" : null} 
                      name='lastName'
                      placeholder='Last Name'
                      onChange={this.handleChange}
                      required
                  />
                  </div>
                  {formErrors.lastName.length > 0 && (
                    <span className="errorMessage">{formErrors.lastName}</span>
                  )}
                </div>
                    
                <div>
                  <div>
                  <h5>E-Mail :</h5><br></br>
                  <input 
                    type='email'
                    autoComplete='off'
                    className={formErrors.email.length > 0 ? "error" : null} 
                    name='email'
                    placeholder='Enter your email'
                    onChange={this.handleChange}
                    required
                  />
                  </div>
                  {formErrors.email.length > 0 && (
                    <span className="errorMessage">{formErrors.email}</span>
                  )}
                </div>

              
                <div>
                  <div>
                    <h5>Password :</h5><br></br>
                    <input 
                      type='password'
                      className={formErrors.password.length > 0 ? "error" : null} 
                      name='password'
                      placeholder='Password'
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  {formErrors.password.length > 0 && (
                    <span className="errorMessage">{formErrors.password}</span>
                  )}
                </div>
              
                <div className='selectContainerDiv'>
                  <div>
                    <h5>Gender :</h5>
                    <select name='gender' onChange={this.handleChange} className="custom-select">
                      <option value='ge'>gender</option>
                      <option value='male'>Male</option>
                      <option value='female'>Female</option>
                    </select>
                  </div>
                  {formErrors.gender.length > 0 && (
                    <span className="errorMessage genderError">{formErrors.gender}</span>
                  )}
                </div>

                <div className='selectContainerDiv'>
                  <div>
                    <h5>SignUp as :</h5>
                    <select name='user' onChange={this.handleChange} className="custom-select">
                      <option value='ge'>user</option>
                      <option value='Seller'>Seller</option>
                      <option value='buyer'>Buyer</option>
                    </select>
                  </div>
                  {formErrors.user.length > 0 && (
                    <span className="errorMessage genderError">{formErrors.user}</span>
                  )}
                </div>
              

                <button type='submit'>Sign up</button>
                <Link to='/userLogin' className='link'>
                  <h6 className='link'>Already have an account? Sign In!</h6>
                </Link>
              </form>
            </div>

            <div className='slideshow'>
              <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
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
        
          </div>
        </div>
      </div>
     
    );
  }
}

export default App;
