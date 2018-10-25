import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';


import About from './containers/About';
import Home from './containers/Home';
import Contact from './containers/Contact';
import Product from './containers/Product';

import Navbar from './components/navbar';
import Footer from './components/footer';
import ShoppingCart from './components/shoppingCart';

export default () => {
    return (
        <Router>
            <main>
                <Navbar/>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/about" component={About}/>
                    <Route path="/contact" component={Contact}/>
                    <Route path="/products/:id" component={Product}/>
                </Switch>
                <Footer/>
                <ShoppingCart/>
            </main>
        </Router>
    )
}
