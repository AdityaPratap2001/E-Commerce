import React from 'react';
import './Confirmation.css';
import src from '../../../assets/confirmed.png';

const Confirmation = (props) =>{
  return (
    <div className='confirm'>
      <img src={src} alt='email-sent'/>
      <h5>{props.content}</h5>
    </div>
  );
}

export default Confirmation;
