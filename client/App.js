import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';


import About from './containers/About';
import Checkout from './containers/Checkout';
import Home from './containers/Home';
import Contact from './containers/Contact';
import Product from './containers/Product';
import Products from './containers/Products';
import Signin from './containers/Signin';
import Dashboard from './containers/Dashboard';
import Track from './containers/Track';
import Payment from './containers/Checkout/Payment';

import Navbar from './components/navbar';
import Footer from './components/footer';
import ShoppingCart from './components/shoppingCart';


const Client = () => (
    <React.Fragment>
        <Navbar/>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/checkout/payment/:id" component={Payment}/>
            <Route path="/checkout" component={Checkout}/>
            <Route path="/contact" component={Contact}/>
            <Route path="/products/:id" component={Product}/>
            <Route path="/products" component={Products}/>
            <Route path="/track/:id" component={Track}/>
        </Switch>
        <Footer/>
        <ShoppingCart/>
    </React.Fragment>
);
const Admin = (props) => (
    <Route path={props.match.path} component={Dashboard}/>
);

export default () => {
    return (
        <Router>
            <Switch>
                <Route path="/dashboard" component={Admin}/>
                <Route path="/signin" component={Signin}/>
                <Route path="/" component={Client}/>
            </Switch>
        </Router>
    )
}
