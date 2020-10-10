import React from 'react';
import './Error.css';
import src from '../../../assets/error3.png';
// import {NavLink} from 'react-router-dom';

const Error = (props) =>{

  let data = (
    null
  )
  if(props.showExtraText){
    data = (
      <h6 style={{transform : 'translateY(-30px)'}}>A verification link has been sent to your Email!</h6>      
    )
  }
  return (
    <div className='error'>
      <img src={src} alt='error'/>
      <h5>{props.content}</h5>
      {data}
      <button onClick={()=>{props.reload()}}>Try again</button>
    </div>
  );
}

export default Error;