import React, { Component } from 'react';
import { Switch } from 'react-router-dom';

import { Layout } from './styles';

import AuthRequiredRoute from 'components/Authentication';
import Navigation from './Navigation';
import Overview from './Overview';
import Products from './Products';
import ProductsNew from './Products/New';
import ProductsEdit from '../../components/editors/ProductsEditor';
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
                        <AuthRequiredRoute exact path={this.props.match.path} component={Overview}/>
                        <AuthRequiredRoute path={`${this.props.match.path}/products/new`} component={ProductsNew}/>
                        <AuthRequiredRoute path={`${this.props.match.path}/products/edit/:id`} component={ProductsEdit}/>
                        <AuthRequiredRoute path={`${this.props.match.path}/products`} component={Products}/>
                        <AuthRequiredRoute path={`${this.props.match.path}/orders`} component={Orders}/>
                        <AuthRequiredRoute path={`${this.props.match.path}/categories`} component={Categories}/>
                        <AuthRequiredRoute path={`${this.props.match.path}/sizes`} component={Sizes}/>
                        <AuthRequiredRoute path={`${this.props.match.path}/payments`} component={Payments}/>
                        <AuthRequiredRoute path={`${this.props.match.path}/deliveries`} component={Deliveries}/>
                    </Switch>
                </Layout.Right>
            </Layout>
        )
    }
}
