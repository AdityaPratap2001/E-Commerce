import React from 'react';
import {NavLink} from 'react-router-dom';
import './Sidebar.css';

const Sidebar = (props) =>{
  return (
    <div>
      <div className='main_category'>
        <NavLink activeStyle={{textDecoration:'underline',color:'black'}} to='/category/Men'>Men</NavLink>
        <div className='sub_category'>
          <NavLink activeStyle={{textDecoration:'underline',color:'black'}} to='/category/Men/Topwear'>Topwear</NavLink>
          <NavLink activeStyle={{textDecoration:'underline',color:'black'}} to='/category/Men/Bottomwear'>Bottomwear</NavLink>
          <NavLink activeStyle={{textDecoration:'underline',color:'black'}} to='/category/Men/Footwear'>Footwear</NavLink>
        </div>
      </div>
      <div className='main_category'>
        <NavLink activeStyle={{textDecoration:'underline',color:'black'}} to='/category/Women'>Women</NavLink>
        <div className='sub_category'>
          <NavLink activeStyle={{textDecoration:'underline',color:'black'}} to='/category/Women/Topwear'>Topwear</NavLink>
          <NavLink activeStyle={{textDecoration:'underline',color:'black'}} to='/category/Women/Bottomwear'>Bottomwear</NavLink>
          <NavLink activeStyle={{textDecoration:'underline',color:'black'}} to='/category/Women/Footwear'>Footwear</NavLink>
        </div>
      </div>
      <div className='main_category'>
        <NavLink activeStyle={{textDecoration:'underline',color:'black'}} to='/category/Kids'>Kids</NavLink>
        <div className='sub_category'>
          <NavLink activeStyle={{textDecoration:'underline',color:'black'}} to='/category/Kids/Boys'>Boys</NavLink>
          <NavLink activeStyle={{textDecoration:'underline',color:'black'}} to='/category/Kids/Girls'>Girls</NavLink>
          <NavLink activeStyle={{textDecoration:'underline',color:'black'}} to='/category/Kids/Footwear'>Footwear</NavLink>
        </div>
      </div>
      <div className='main_category'>
        <NavLink activeStyle={{textDecoration:'underline',color:'black'}} to='/category/Home_&_Living'>Home & Living</NavLink>
        <div className='sub_category'>
          <NavLink activeStyle={{textDecoration:'underline',color:'black'}} to='/category/Home_&_Living/Decor'>Decor</NavLink>
          <NavLink activeStyle={{textDecoration:'underline',color:'black'}} to='/category/Home_&_Living/Furnishing'>Furnishing</NavLink>
        </div>
      </div>
      <div className='main_category'>
        <NavLink activeStyle={{textDecoration:'underline',color:'black'}} to='/category/Travel_Bags'>Travel Bags</NavLink>
        {/* <div className='sub_category'>
          <NavLink to='/category/Men/Topwear'>Topwear</NavLink>
          <NavLink to='/category/Men/Bottomwear'>Bottomwear</NavLink>
          <NavLink to='/category/Men/Footwear'>Footwear</NavLink>
        </div> */}
      </div>
    </div>
  );
}

export default Sidebar;