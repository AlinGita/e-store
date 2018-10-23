import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';


import About from './containers/About';
import Home from './containers/Home';
import Product from './containers/Product';

import Navbar from './components/navbar';

export default () => {
    return (
        <Router>
            <main>
                <Navbar/>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/about" component={About}/>
                    <Route path="/products/:id" component={Product}/>
                </Switch>
            </main>
        </Router>
    )
}
