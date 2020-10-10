import React, { Component } from 'react';
import '../Newsletter.css';

class Submitted extends Component {

  submitHandler = (event) => {
    event.preventDefault();
    this.props.submitHandler();
  }

  changeHandler = (event) =>{
    this.setState({signUpEmail : event.target.value});
  }

  render() {
    return (
      <div>
        <form className='newsletter_input' onSubmit={this.submitHandler}>
          <i className="fas fa-check-circle"></i>
          <h4>Thank you for Siging Up to our newsletter!</h4>
          <button type='submit' className='submitted'>Another Email?</button>
        </form>
      </div>
    );
  }
}

export default Submitted;