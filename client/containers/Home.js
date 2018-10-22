import React,{Component} from 'react';
import { connect } from 'react-redux';
import { fetchProducts, createProduct } from '../actions/productsActions';
import { removeProduct, clearShoppingCart } from "../actions/shoppingCart";
import { ProductsList } from '../components/products';

import Slider from '../components/slider';
import { Wrapper } from '../components/layout';

import styled from 'styled-components';

class Home extends Component {
    state = {
        products: [],
        productName: '',
        productPrice: 0
    };

    componentDidMount = () => {
        this.props.fetchProducts();
    };

    changeProductName = e => {
        this.setState({ productName: e.target.value });
    };

    changeProductPrice = e => {
        this.setState({ productPrice: e.target.value });
    };

    submitProduct = async (e) => {
        e.preventDefault();
        this.props.createProduct({
            name: this.state.productName,
            price: this.state.productPrice
        })
    };


    render() {
        const { productName, productPrice } = this.state;

        const { products, cart } = this.props;

        const images = [
            'https://images.unsplash.com/photo-1503532899220-c678a6808a63?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9f4900370bef7237707e6d26b60dbf41&auto=format&fit=crop&w=1350&q=80',
            'https://images.unsplash.com/photo-1500907789384-0c3b4c3bdce4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fcc07ca2525ef8f0d0e70a4655f22da9&auto=format&fit=crop&w=1350&q=80',
            'https://images.unsplash.com/photo-1519256155806-cd510524ed97?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1b92dd501bb6982f36f6b16819f40a4a&auto=format&fit=crop&w=1934&q=80',
        ];

        return (
            <Wrapper>
                <Slider images={images}/>
                <ProductsList products={Object.values(products.products)}/>
                <form>
                    <input type="text" placeholder="item name" value={productName} onChange={this.changeProductName}/>
                    <input type="text" placeholder="item price" value={productPrice} onChange={this.changeProductPrice}/>
                    <button type="submit" onClick={this.submitProduct}>Submit</button>
                </form>
                <div>
                    <h2>Cart:</h2>
                    <ul>
                        {
                            Object.values(cart.products).map(product => (
                                <li>
                                    <p>{product.name}</p>
                                    <button onClick={() => this.props.removeProduct(product._id)}>removeProduct</button>
                                </li>
                            ))
                        }
                    </ul>
                    <button onClick={this.props.clearShoppingCart}>Clear cart</button>
                </div>
            </Wrapper>
        )
    }
}

const mapStateToProps = ({ products, cart }) => ({ products, cart });
export default connect(mapStateToProps, {
    fetchProducts, createProduct,
    removeProduct, clearShoppingCart
})(Home);

