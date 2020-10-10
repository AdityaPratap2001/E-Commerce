import React, {Component} from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import Carousel from '../../components/Carousel/Carousel';
import Categories from '../../components/Categories/Categories';
import FeaturedSection from '../../components/FeaturedSection/FeaturedSection';
import BankOffers from '../../components/BankOffers/BankOffers';
import Newsletter from '../../components/Newsletter/Newsletter';
import Footer from '../../components/Footer/Footer';

class Home extends Component {

  state = {
    isLoggedIn : null,
    searchTerm : null,
  }

  componentDidMount(){

    let token = localStorage.getItem('token');
    let role = localStorage.getItem('role');
    if(token !== null && role===null){
      this.setState({isLoggedIn : true});
      // console.log('token exists!');
      // console.log(this.state);
    }
    else{
      // console.log("token doesn't exist!");
    }
  }

  render() {

    let tagLine = 'Trending Products';
    if(this.state.isLoggedIn){
      tagLine = 'Personalized for You'
    }

      return (
        <div>
          <Navbar shadow={true}/>
          <Carousel/>
          <Categories/>
          <FeaturedSection
            personalized={false}
            sectionTitle='Featured Products' 
            subHead1='Choose from our best products'
            subHead2='These products are worth adding to your cart!'
          />
          <FeaturedSection
            personalized={true}
            sectionTitle={tagLine} 
            subHead1="We've picked some items for you"
            subHead2='These products are worth adding to your cart!'
          />
          <BankOffers/>
          <Newsletter/>
          <Footer/>
        </div>
      );
  
  }
}

export default Home;
