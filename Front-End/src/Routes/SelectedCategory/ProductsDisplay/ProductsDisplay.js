import React, { Component } from 'react';
import ProductBlock from '../../../components/ProductBlock/ProductBlock';
import '../SelectedCategory.css';

class ProductsDisplay extends Component {
  render() {

    let display = this.props.products.map((item,index) => {
      return <ProductBlock key={index} item={item}/>
    }) 

    return (
      <div className='displayContainer'>
        {display}
      </div>
    );
  }
}

export default ProductsDisplay;