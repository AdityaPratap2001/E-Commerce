import React, { Component } from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import logoSrc from '../../assets/log.png';
import sellerBanner from '../../assets/sellerBanner2.png';
import './Seller.css';
import Footer from '../../components/Footer/Footer';

class Seller extends Component {

  state = {
    redirect : null,
  }

  render() {

    if(this.state.redirect){
      return <Redirect to='/'/>
    }

    return (
      <div className='sellerPage'>
        
        <nav>
          <div className="Navbar sellerNav navbar navbar-expand-lg navbar-light bg-light" style={{ boxShadow : '0px 3px 9px #c6c6cc'}}>
            
            <div className="navbar-brand">
                <img src={logoSrc} alt='logo'/>
            </div>

            <div style={{position: 'absolute',right : '5%'}}>
              <NavLink to='/Seller/user'>
                <i className="fas fa-user"></i>
              </NavLink>
            </div>
          
          </div>
        </nav>

        <div className='sellerBanner'>
          <NavLink to='/Seller/user'>
            <img src={sellerBanner} alt='sellerBanner'/>
          </NavLink>
        </div>

        <div className='sellerIntro'>
          <h5>Why sell on ClickNShip?</h5>
          <h6>
            We can help you showcase your products to crores of
            customer & businesses - 24 hours a day - on India's
            most trusted shopping destination. More than 5 lakh
            businnesses, big or small, have trusted us with their products.<br></br>
            Start your selleing journey with us & expand your 
            business reach.
          </h6>
        </div>

        <div className='sellerBenefits'>
          <h5>Seller Benefits</h5>
          <div className='sellerBenefitsCont'>
            
            <div>
              <i className="fas fa-cash-register"></i>
              <h5>Secure Payments</h5>
              <h6>
                Whether you’re banking online or using our Mobile Banking
                app, rest assured you're protected by our Secure Banking 
                Promise.
              </h6>
            </div>
            
            <div>
              <i className="fas fa-truck-loading"></i>
              <h5>Easy Shipping</h5>
              <h6>
                Let us take care of delivering all your products, to any
                customer in any city, across the whole nation.  
              </h6>
            </div>
            
            <div>
              <i className="fas fa-users-cog"></i>
              <h5>Services Provided</h5>
              <h6>
               Get paid support from ClickNShip's professionals for products
               photography, account management and much more.
              </h6>
            </div>
          </div>
        </div>

        <div className='sellerBenefits'>
          <h5>Grow with us</h5>
          <div className='sellerBenefitsCont sellerGrowCont'>
            
            <div>
              <i className="fas fa-bullhorn"></i>
              <h5>Advertise</h5>
              <h6>
                Whether you’re banking online or using our Mobile Banking
                app, rest assured you're protected by our Secure Banking 
                Promise.
              </h6>
            </div>
            
            <div>
              <i className="fas fa-globe-asia"></i>
              <h5>Sell Nationaly</h5>
              <h6>
                Reach customers in 250+ cities with our vast network
                & give your products the reach they've always needed!
              </h6>
            </div>

          </div>
        </div>

        <div className='startSelling'>
          <NavLink to='/Seller/user'>
            <button type="button" className="btn btn-primary">Start Selling</button>
          </NavLink>
        </div>
        
        <Footer/>

      </div>
    );
  }
}

export default Seller;