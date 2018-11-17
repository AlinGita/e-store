import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeProduct, openShoppingCart, changeProductAmount } from 'actions/shoppingCart';
import {
    Aside,
    Products, Product,
    OutsideClickHandler,
    Title,
    CloseButton,
    Scrollable,
} from './styles';

import {
    Purchase,
    PurchaseButton,
    PurchasePrice
} from 'containers/Product/styles';

import NumericInput from 'components/NumericInput';

class ShoppingCart extends Component {
    clickedOutside = e => {
        this.props.openShoppingCart(false);
    };

    componentDidUpdate(prevProps) {
        if(prevProps.cart.closed !== this.props.cart.closed) {
            document.body.style.overflow = this.props.cart.closed ? '' : 'hidden';
        }
    }

    render() {
        console.log(this.props)
        const { cart } = this.props;

        const products = Object.values(cart.products);

        return (
            <Aside closed={cart.closed}>
                <OutsideClickHandler closed={cart.closed} onClick={this.clickedOutside}/>
                <CloseButton onClick={() => this.props.openShoppingCart(false)}><i className="fas fa-times"></i></CloseButton>
                <Title>Your Items</Title>
                { products.length === 0 &&
                <Title disabled>Your shopping cart is empty</Title>
                }
                <Scrollable>
                { products.length > 0 &&
                <React.Fragment>
                    <Products>
                        <thead>
                        <tr>
                            <th>Remove</th>
                            <th colSpan="2">Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            products.map(product => (
                                <Product key={product._id}>
                                    <td>
                                        <button
                                            onClick={() => this.props.removeProduct(product._id)}>
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </td>
                                    <td><img src={product.pictures[0]} alt={product.name}/></td>
                                    <td>
                                        <span>{product.name} (Size: {product.size.short})</span>
                                        <span>{product.description}</span>
                                    </td>
                                    <td>
                                        <NumericInput value={product.amount} onChange={(value) => this.props.changeProductAmount(product._id, value)}/>
                                    </td>
                                    <td>&euro; {product.price}</td>
                                </Product>
                            ))
                        }
                        </tbody>
                    </Products>
                    <Purchase>
                        <PurchaseButton>CHECKOUT</PurchaseButton>
                        <PurchasePrice>&euro; {products.reduce((accumulator, product) => accumulator + (product.price * product.amount), 0)}</PurchasePrice>
                    </Purchase>
                </React.Fragment>
                }
                </Scrollable>
            </Aside>
        )
    }
}
const mapStateToProps = ({ cart }) => ({ cart });
export default connect(mapStateToProps, { removeProduct, openShoppingCart, changeProductAmount })(ShoppingCart);