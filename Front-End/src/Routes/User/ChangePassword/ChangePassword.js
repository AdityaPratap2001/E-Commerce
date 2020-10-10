import React from 'react';
import './ChangePassword.css';  

class ChangePassword extends React.Component {

  state = {
    input: {},
    errors: {}
  };
     
  handleChange = (event) => {
    let input = this.state.input;
    input[event.target.name] = event.target.value;
  
    this.setState({
      input
    });
  }
     
  handleSubmit = (event) => {
    event.preventDefault();
  
    if(this.validate()){
        // console.log(this.state.input);
        this.props.submitHandler(this.state.input);
  
        let input = {};
        input["old_password"] = "";
        input["password"] = "";
        input["confirm_password"] = "";
        this.setState({input:input});
  
        // alert('Demo Form is submited');
    }
  }
  
  validate(){
      let input = this.state.input;
      let errors = {};
      let isValid = true;
  
      if (!input["old_password"]) {
        isValid = false;
        errors["old_password"] = "Please enter your old password.";
      }

      if(input["password"].length < 6){
        isValid = false;
        errors["password"] = "Minimum 6 characters required!";
      }

      if (!input["password"]) {
        isValid = false;
        errors["password"] = "Please enter your new password.";
      }
  
      if (!input["confirm_password"]) {
        isValid = false;
        errors["confirm_password"] = "Please confirm your password.";
      }
  
      if (typeof input["password"] !== "undefined" && typeof input["confirm_password"] !== "undefined") {
          
        if (input["password"] !== input["confirm_password"]) {
          isValid = false;
          errors["password"] = "Passwords don't match.";
        }
      } 
  
      this.setState({
        errors: errors
      });
  
      return isValid;
  }
     
  render() {
    return (
      <div>
        <form className='changeDetails_form' onSubmit={this.handleSubmit}>
  
          <div className="form-group">
            <label>Old Password:</label>
            <input 
              type="text" 
              name="old_password" 
              value={this.state.input.old_password}
              onChange={this.handleChange}
              className="form-control" 
              placeholder="Enter Old password" 
              id="name" />
  
              <div className="text-danger">{this.state.errors.name}</div>
          </div>
  
   
          <div className="form-group">
            <label>Password:</label>
            <input 
              type="password" 
              name="password" 
              value={this.state.input.password}
              onChange={this.handleChange}
              className="form-control" 
              placeholder="Enter New password" 
              id="password" />
  
              <div className="text-danger">{this.state.errors.password}</div>
          </div>
  
          <div className="form-group">
            <label>Confirm Password:</label>
            <input 
              type="password" 
              name="confirm_password" 
              value={this.state.input.confirm_password}
              onChange={this.handleChange}
              className="form-control" 
              placeholder="Enter confirm password" 
              id="confirm_password" />
  
              <div className="text-danger">{this.state.errors.confirm_password}</div>
          </div>
              
          <button type="submit" className="btn btn-success">Confirm</button>
        </form>
      </div>
    );
  }
}
  
export default ChangePassword;