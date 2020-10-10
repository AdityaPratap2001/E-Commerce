import React from 'react';
import './Category.css';

const Category = (props) => {
  
  let className = 'category ';
  let secondClass = props.type;

  if(props.type === 'Home_&_Living'){
    className += 'shift_right';
    secondClass = 'HomeLiving';
  }
  else if(props.type === 'Travel_Bags'){
    className += 'shift_left';
    secondClass = 'Bags' 
  }

  return (
    <div className={`${className} ${secondClass}`}>
      {/* <h6>{props.type}</h6> */}
    </div>
  );
}

export default Category;