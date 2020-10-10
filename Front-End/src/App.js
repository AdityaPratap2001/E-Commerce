import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import Home from './Routes/Home/Home';
import Signup from './Routes/SignUp/SignUp';
import Login from './Routes/Login/Login';
import './App.css';
import SelectedCategory from './Routes/SelectedCategory/SelectedCategory';
import ProductDetails from './Routes/ProductDetails/ProductDetails';
import Wishlist from './Routes/Wishlist/Wishlist';
import Cart from './Routes/Cart/Cart';
import User from './Routes/User/User';
import SearchProduct from './Routes/SearchProduct/SearchProduct';
import Seller from './Routes/Seller/Seller';
import SellerProfile from './Routes/Seller/SellerProfile/SellerProfile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path='/' exact component={Home}/>
        <Route path='/userSignup' exact component={Signup}/>
        <Route path='/userLogin' exact component={Login}/>
        {/* <Route path='/category/:id' exact component={SelectedCategory}/> */}
        <Route path='/category/:id' exact 
          render={props => <SelectedCategory key={props.location.pathname} {...props}/>}
        />
        <Route path='/category/:id/:id2' exact 
          render={props => <SelectedCategory key={props.location.pathname} {...props}/>}
        />
        <Route path='/product/id/:id' exact 
          render={props => <ProductDetails key={props.location.pathname} {...props}/>}
        />
        <Route path='/wishlist' exact 
          render={props => <Wishlist/>}
        />
        <Route path='/cart' exact 
          render={props => <Cart/>}
        />
        <Route path='/user' exact 
          render={props => <User/>}
        />
        <Route path='/search/:searchTerm' exact
          render={props => <SearchProduct key={props.location.pathname} {...props}/>}
        />
        <Route path='/search/:searchTerm/:gender' exact
          render={props => <SearchProduct key={props.location.pathname} {...props}/>}
        />
        <Route path='/Seller' exact 
          render={props => <Seller/>}
        />
        <Route path='/Seller/user' exact
          render={props => <SellerProfile/>}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
