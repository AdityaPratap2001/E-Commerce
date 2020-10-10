import React, { Component } from "react";
import "../../../SignUp/Form.css";
import "../../../SignUp/SignUp.css";
import './ProfileEditForm.css';

const nameRegex = RegExp(
  /^[a-zA-Z_-]{0,30}$/
)
const lastnameRegex = RegExp(
  /^[a-zA-Z\s]+$/
)

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};

class App extends Component {
  state = {
    firstName: null,
    lastName: null,
    gender: null,
    formErrors: {
      firstName: "",
      lastName: "",
      gender: "",
    },
  };
// bahjbjh
  handleSubmit = (e) => {
    e.preventDefault();

    if (formValid(this.state)) {
      this.props.submitHandler(this.state);
    } 
    else {
      // console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
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
      
      case "gender":
        formErrors.gender = value.length < 3 ? "select an option" : "";
        break;
      
      default:
        break;
    }

    this.setState({ formErrors, [name]: value });
  };

  close = () => {
    this.props.closeForm();
  }

  render() {
    const { formErrors } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit} className='changeDetailsForm'>
          <i className="fas fa-window-close" onClick={this.close}></i>
          <div>
            <div>
              <h5>Firstname :</h5>
              <br></br>
              <input
                type="text"
                autoComplete='off'
                className={formErrors.firstName.length > 0 ? "error" : null}
                name="firstName"
                placeholder="First Name"
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
              <h5>Lastname :</h5>
              <br></br>
              <input
                type="text"
                autoComplete='off'
                className={formErrors.lastName.length > 0 ? "error" : null}
                name="lastName"
                placeholder="Last Name"
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
              <h5>Gender :</h5>
              <br></br>
              <select
                name="gender"
                onChange={this.handleChange}
                className="custom-select"
              >
                <option value="ge">gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            {formErrors.gender.length > 0 && (
              <span className="errorMessage genderError">
                {formErrors.gender}
              </span>
            )}
          </div>

          <button type="submit" class="btn btn-primary">Save</button>
        
        </form>
      </div>
    );
  }
}

export default App;
