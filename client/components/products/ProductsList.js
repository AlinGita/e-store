import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Product from './Product';

import { Grid, Button } from "./styles";

import { connect } from 'react-redux';
import { addProduct} from "../../actions/shoppingCart";

class ProductsList extends Component {
    render() {
        const { products, addProduct } = this.props;
        return (
            <Grid columns={3}>
                {   products &&
                    products.map(product => (
                        <Product key={product._id} {...product}>
                            <Button onClick={() => addProduct(product)}>Add to cart</Button>
                        </Product>
                    ))
                }
            </Grid>
        )
    }
}
ProductsList.propTypes = {
    products: PropTypes.array.isRequired
};

export default connect(null, {addProduct})(ProductsList);

