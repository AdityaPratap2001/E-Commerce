import React from 'react';
import {Link} from 'react-router-dom';
import '../Navbar.css';

const Logout = (props) => {
  return (
    <div className='conditional_render'>
      <Link to='/userSignup'>
        <button type="button">Sign Up</button>
      </Link>
      <Link to='/userLogin'>
        <button type="button">Log In</button>
      </Link>
    </div>
  );
}

export default Logout; 