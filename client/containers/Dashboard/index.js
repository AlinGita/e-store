import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Layout } from './styles';
import Navigation from './Navigation';
import Overview from './Overview';
import Products from './Products';
import ProductsNew from './Products/New';
import Orders from './Orders';
import Categories from './Categories';
import Sizes from './Sizes';
import Payments from './Payments';
import Deliveries from './Deliveries';

export default class Dashboard extends Component {
    render() {
        return (
            <Layout>
                <Layout.Left>
                    <Navigation />
                </Layout.Left>
                <Layout.Right>
                    <Switch>
                        <Route exact path={this.props.match.path} component={Overview}/>
                        <Route path={`${this.props.match.path}/products/new`} component={ProductsNew}/>
                        <Route path={`${this.props.match.path}/products`} component={Products}/>
                        <Route path={`${this.props.match.path}/orders`} component={Orders}/>
                        <Route path={`${this.props.match.path}/categories`} component={Categories}/>
                        <Route path={`${this.props.match.path}/sizes`} component={Sizes}/>
                        <Route path={`${this.props.match.path}/payments`} component={Payments}/>
                        <Route path={`${this.props.match.path}/deliveries`} component={Deliveries}/>
                    </Switch>
                </Layout.Right>
            </Layout>
        )
    }
}
