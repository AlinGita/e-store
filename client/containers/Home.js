import React,{Component} from 'react';
import { connect } from 'react-redux';
import { fetchProducts, createProduct } from '../actions/productsActions';
import { removeProduct, clearShoppingCart } from "../actions/shoppingCart";
import { ProductsList } from '../components/products';


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
        console.log("products: ", products);
        return (
            <div>
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
            </div>
        )
    }
}

const mapStateToProps = ({ products, cart }) => ({ products, cart });
export default connect(mapStateToProps, {
    fetchProducts, createProduct,
    removeProduct, clearShoppingCart
})(Home);

