import React from 'react';
import {NavLink} from 'react-router-dom';

const Login = (props) => {
  return (
    <div className='conditional_render logged_in'>
      <NavLink to='/wishlist'>
        <i className="fas fa-heart"></i>
      </NavLink>
      <NavLink to='/cart'>
        <i className="fas fa-shopping-cart"></i>
      </NavLink>
      <NavLink to='/user'>
        <i className="fas fa-user"></i>
      </NavLink>
    </div>
  );
}

export default Login; 