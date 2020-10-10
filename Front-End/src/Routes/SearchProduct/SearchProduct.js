import React, { Component } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './SearchProduct.css';
import SearchSidebar from '../../components/SearchSidebar/SearchSidebar';
import ProductBlock from '../../components/ProductBlock/ProductBlock';
import searchLoaderSRC from '../../assets/load_1.gif';
import searchEmptySRC from '../../assets/searchEmpty2.gif';
import ServerService from '../../API/ServerService';

class SearchProduct extends Component {

  state = {
    searchTerm : this.props.match.params.searchTerm,
    gender : this.props.match.params.gender,
    products : null,
    noItems : null
  }

  componentDidMount(){
    let finalTerm = this.state.searchTerm.toLowerCase();
    if(this.state.gender){      
      ServerService.searchByGender(this.state.gender,finalTerm)
        .then(res => {
          // console.log(res.data);
          if(res.data.length === 0){
            this.setState({noItems : true});
          }
          else{
            this.setState({products : res.data});
          }
        })
        .catch(err => {
          // console.log(err);
        })
    }
    else{
      // axios.get(`/api/products/productType/${this.state.searchTerm}`)
      ServerService.searchByTerm(finalTerm)
        .then(res => {
          // console.log(res);
          if(res.data.length === 0){
            this.setState({noItems : true});
          }
          else{
            this.setState({products : res.data});
          }
        })
        .catch(err => {
          // console.log(err);
        })
    }
  }

  render() {

    let data = (
      // <h2>Loading...</h2>
      <img src={searchLoaderSRC} className='searchLoadImg' alt='searchLoader'/>
    )
    if(this.state.products){
      data = (
        this.state.products.map((item,index) => {
          return <ProductBlock key={index} item={item}/>
        })
      )
    }
    if(this.state.noItems){
      data = (
        <img src={searchEmptySRC} className='searchEmpty' alt='noItemsFound'/>
      )
    }

    return (
      <div>
        <Navbar shadow={true}/>
        <div className='selected_page'>

          <div className='display_category searchCont'>
            <div className='sidebar'>
              <SearchSidebar term={this.state.searchTerm}/>
            </div>
            
            <div className='products_display searchDisplayCont'>
              <h5>{`Items related to your search : "${this.state.searchTerm}"`}</h5>
              <div className='displayContainer searchLoad'>
                {data}
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default SearchProduct;