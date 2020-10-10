import React from 'react';
import paypalSrc from '../../assets/paypal2.png';
import './Footer.css';

const Footer = (props) => {
  return (
    <div className='footer'>
      <div className='footer_sub'>
        <div className='footerAboutUs'>
          <h4>About Us</h4>
          <h5 className='team'>Team ClickNShip,</h5>
          <h5>Ph no : 0120-2312123</h5>
          <h5>Uttar Pradesh</h5>
          <h5>India</h5>
        </div>
        {/* <div>
          <h4>Customer Care</h4>
          <h5>item one</h5>
          <h5>item two</h5>
          <h5>item three</h5>
          <h5>Item  four</h5>
        </div> */}
        {/* <div>
          <h4>Contact Us</h4>
          <h5>item one</h5>
          <h5>item two</h5>
          <h5>item three</h5>
          <h5>Item  four</h5>
        </div> */}
        <div style={{width:'320px'}}>
          <img src={paypalSrc} alt='paypal'/><br></br>
          <h5>We promise safe transactions!</h5>
        </div>
      </div>
      <div className='fontIcon'>
        
        <a href="https://github.com/15ishaan/ClickNShip">
          <i className="fab fa-github"/>
        </a>
        <a href="https://www.instagram.com/team.clicknship">
          <i class="fab fa-instagram"></i>
        </a>
        <a href="mailto:teamclicknship@gmail.com">
          <i className="fab fa-google-plus-g"></i>
        </a>
        
      </div>
      <div>
        <h6>Terms and conditions | Privacy Policy | Sitemap</h6>
      </div>
    </div>
  );
}

export default Footer;