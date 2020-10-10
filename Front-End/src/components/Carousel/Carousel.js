import React from 'react';
import './Carousel.css';
import src1 from '../../assets/banner1.png';
import src2 from '../../assets/banner10.png';
import src3 from '../../assets/banner12.png';

const Carousel = () => {
  return (
    <div className='carousel'>
      <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src={src1} alt="First slide"/>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src={src2} alt="Second slide"/>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src={src3} alt="Third slide"/>
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
}

export default Carousel;