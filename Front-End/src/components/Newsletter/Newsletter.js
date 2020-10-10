import React, { Component } from 'react';
import './Newsletter.css';
import Notsubmitted from './ConditionalRender/Notsubmitted';
import Submitted from './ConditionalRender/Submitted';

class Newsletter extends Component {

  state = {
    submitted : false
  }

  submitHandler = () =>{
    let newState = !this.state.submitted;
    this.setState({submitted : newState});
  }

  render() {

    if(this.state.submitted){
      return(
        <div className='newsletter'>
          <Submitted submitHandler={this.submitHandler}/>
        </div>
      )
    }

    return (
      <div className='newsletter'>
        <Notsubmitted submitHandler={this.submitHandler}/>
      </div>
    );
  }
}

export default Newsletter;
