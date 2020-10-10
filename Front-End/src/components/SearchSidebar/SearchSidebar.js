import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import './SearchSidebar.css';

class SearchSidebar extends Component {

  state = {
    gender : null,
  }

  changeHandler = (e) => {
    // let newState = e.target.value
    this.setState({gender : e.target.value});
    // console.log(this.state);
  }

  render() {
    return (
      <div>
        <div className='main_category' style={{fontWeight : '600'}}>
          Sort By :
        </div>
        
        <div className='main_category genderHead'>
          Gender : 
        </div>
        
        <div className='sub_category'>
          <NavLink activeStyle={{textDecoration:'underline',color:'black'}} to={`/search/${this.props.term}/Men`}>Male</NavLink>
          <NavLink activeStyle={{textDecoration:'underline',color:'black'}} to={`/search/${this.props.term}/Women`}>Female</NavLink>
        </div>

        {/* <select onChange={this.changeHandler} className='genderSelect'>
          <option value='Male'>Male</option>
          <option value='Female'>Female</option>
        </select> */}

      </div>
    );
  }
}


export default SearchSidebar;