import React, { Component } from 'react';
import '../Newsletter.css';
import ServerService from '../../../API/ServerService';

class Notsubmitted extends Component {

  state = {
    signUpEmail : ''
  }

  submitHandler = (event) => {
    event.preventDefault();
    if(this.state.signUpEmail === ''){
      return;
    }
    else{
      ServerService.addService(this.state.signUpEmail)
        .then(res => {
          // console.log(res);
        })
        .catch(err => {
          // console.log(err);
        })
    }
    // console.log(this.state);
    this.props.submitHandler();
  }

  changeHandler = (event) =>{
    this.setState({signUpEmail : event.target.value});
  }

  render() {
    return (
      <div>
        <h4>Want to get daily updates on the latest fashion trends?</h4>
        <h5>Signup for our newsletter...!</h5>
        <div>
          <form className='newsletter_input' onSubmit={this.submitHandler}>
            <input 
              type='email' 
              placeholder='Your Email' 
              onChange={this.changeHandler}
              value={this.state.signUpEmail}
            />
            <button type="submit" className="btn btn-light">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Notsubmitted;