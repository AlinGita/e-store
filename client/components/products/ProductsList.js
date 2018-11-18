import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Product from './Product';

import { Button, Products, ProductItem } from './styles';

import { connect } from 'react-redux';
import { addProduct} from "actions/shoppingCart";

class ProductsList extends Component {
    render() {
        const { products, addProduct } = this.props;
        return (
            <Product>
                {   products &&
                    products.map(product => (
                        <ProductItem key={product._id}>
                            <Product {...product}>
                                <Button onClick={() => addProduct(product)}><i className="fas fa-shopping-cart"></i> Add to basket</Button>
                            </Product>
                        </ProductItem>
                    ))
                }
            </Product>
        )
    }
}
ProductsList.propTypes = {
    products: PropTypes.array.isRequired
};

export default connect(null, {addProduct})(ProductsList);

