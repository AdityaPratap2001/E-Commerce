import React, { Component } from "react";
import ProductBlock from "../ProductBlock/ProductBlock";
import "./FeaturedSection.css";
import ServerService from "../../API/ServerService";

class FeaturedSection extends Component {
  state = {
    items: null,
    userData: false,
    loggedIN: null,
    gender: null,
  };

  componentDidMount() {
    if (!this.props.personalized) {
      // FOR FEATURED PRODUCTS!'
      ServerService.fetchFeaturedProducts()
        .then((res) => {
          console.log(res);
          this.setState({ items: res.data });
        })
        .catch((err) => {
          console.log(err);
        });
    } 
    else {
      // FOR PERSONALIZED SECTION!
      let userName = localStorage.getItem('username');
      ServerService.fetchPersonalizedProducts(userName)
        .then((res) => {
          console.log(res);
          this.setState({ items: res.data });
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  render() {
    let data = <h4>Loading...</h4>;
    if (this.state.items) {
      data = this.state.items.map((item, index) => {
        return <ProductBlock key={index} item={item} />;
      });
    }

    if (this.props.personalized && this.state.items && this.state.gender) {
      data = this.state.items.map((item, index) => {
        return <ProductBlock key={index} item={item} />;
      });
    }

    return (
      <div className="featured">
        <h3>{this.props.sectionTitle}</h3>
        <h5>
          {this.props.subHead1}
          <br></br>
          {this.props.subHead2}
          <br></br>
        </h5>

        <div className="featured_block">{data}</div>
      </div>
    );
  }
}

export default FeaturedSection;
