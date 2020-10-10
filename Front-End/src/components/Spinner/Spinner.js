import React from 'react';
import './Spinner.css';
import src from '../../assets/loader.gif';

const Spinner = (props) =>{
  return (
    <div className='spinner'>
      <img src={src} alt='spinner'/>
      <h5>Wait while we check your details!</h5>
    </div>
  );
}

export default Spinner;