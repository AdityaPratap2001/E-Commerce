import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import './SelectedCategory.css';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import ProductsDisplay from './ProductsDisplay/ProductsDisplay';
import loaderSrc from '../../assets/loader2.gif';
import ServerService from '../../API/ServerService';


class SelectedCategory extends Component {

  state = {
    category : this.props.match.params.id,
    subcategory : this.props.match.params.id2,
    products : null
  }

  componentDidMount(){
    let mainSearchCategory = '';
    let subSearchCategory = '';
    switch(this.state.category){
      case 'Men' : mainSearchCategory = 'Men';
                  break;
      case 'Women' : mainSearchCategory = 'Women';
                    break;
      case 'Kids' : mainSearchCategory = 'Kids';
                    break;
      case 'Home_&_Living' : mainSearchCategory = 'Home and Living';
                            break;
      case 'Travel_Bags' : mainSearchCategory = 'Travel Trolley';
                          break;
      default : break;
    }
    if(this.state.subcategory){
      switch(this.state.subcategory){
        case 'Topwear' : subSearchCategory = 'Top-wear';
                    break;
        case 'Bottomwear' : subSearchCategory = 'Bottom-wear';
                      break;
        case 'Footwear' : subSearchCategory = 'Foot-wear';
                      break;
        case 'Boys' : subSearchCategory = 'Boys Clothing';
                              break;
        case 'Girls' : subSearchCategory = 'Girls Clothing';
                            break;
        default : break;
        
      }
      if(this.state.category === 'Kids' && this.state.subcategory){
        if(this.state.subcategory === 'Footwear'){
          subSearchCategory = 'Kids Footwear';
        }
        else if(this.state.subcategory === 'Boys'){
          subSearchCategory = 'Boys Clothing';
        }
        else if(this.state.subcategory === 'Girls'){
          subSearchCategory = 'Girls Clothing';
        }
      }
      if(this.state.category === 'Home_&_Living' && this.state.subcategory){
        if(this.state.subcategory === 'Decor'){
          subSearchCategory = 'Home Decor';
        }
        else if(this.state.subcategory === 'Furnishing'){
          subSearchCategory = 'Bed and Furnishing';
        }
      }
    }
    if(this.state.category === 'Travel Trolley'){
      subSearchCategory = 'Trolley';
    }
    
    
    // console.log('MC-'+ mainSearchCategory + ' SC-' + subSearchCategory);
    
    if(this.state.subcategory){
      ServerService.fetchBySubcat(mainSearchCategory,subSearchCategory) 
        .then(res => {
          // console.log(res);
          this.setState({products : res.data});
        })
        .catch(err =>{
          // console.log(err);
        })
    }
    else{
      ServerService.fetchByCat(mainSearchCategory)
        .then(response => {
          // console.log(response);
          this.setState({products : response.data});
        })
        .catch(error => {
          // console.log(error);
        })
    }
    // console.log(fetchedData);
    // console.log(this.state);
  }

  render() {

    // console.log(this.props.match.params.id);
    let navContent = (
      <div className='breadcrumbnav'>
        <NavLink className='link' exact to='/' activeStyle={{textDecoration:'underline'}}>
          Home
        </NavLink>
         > 
         <NavLink className='link' exact to={`/category/${this.state.category}`} activeStyle={{textDecoration:'underline'}}>
          {this.state.category} 
         </NavLink>
      </div>
    )
    if(this.state.subcategory){
      navContent = (
        <div className='breadcrumbnav'>
        <NavLink className='link' exact to='/' activeStyle={{textDecoration:'underline'}}>
          Home
        </NavLink>
         > 
         <NavLink className='link' exact to={`/category/${this.state.category}`} activeStyle={{textDecoration:'underline'}}>
          {this.state.category} 
         </NavLink>
         >
         <NavLink className='link' exact to={`/category/${this.state.category}/${this.state.subcategory}`} activeStyle={{textDecoration:'underline'}}>
          {this.state.subcategory} 
         </NavLink>
      </div>
      )
    }

    let data = (
      <div className='displayContainer loading'>
        <img src={loaderSrc} alt='loader'/>
      </div>
    )
    if(this.state.products){
      data = (
        // this.state.products.map(item => {
        //   return <ProductBlock itme={item}/>
        // })
        <ProductsDisplay products={this.state.products}/>
      )
    }
    
    return (
      <div>
        <Navbar shadow={true}/>
        <div className='selected_page'>

          {navContent}
          <div className='display_category'>
            <div className='sidebar'>
              <Sidebar/>
            </div>
            <div className='products_display'>
              {data}
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default SelectedCategory;
