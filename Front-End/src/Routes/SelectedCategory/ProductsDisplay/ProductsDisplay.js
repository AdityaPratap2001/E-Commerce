import React, { Component } from 'react';
import ProductBlock from '../../../components/ProductBlock/ProductBlock';
import '../SelectedCategory.css';

class ProductsDisplay extends Component {
  render() {

    let display = this.props.products.map((item,index) => {
      let product = { ...item };
      product.id = item._id;
      product.pic = item.imageUrl;
      return (
       <ProductBlock key={index} item={product}/>
      )
    }) 

    return (
      <div className='displayContainer'>
        {display}
      </div>
    );
  }
}

export default ProductsDisplay;