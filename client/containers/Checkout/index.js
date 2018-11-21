import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';

import Spacer from 'blocks/Spacer';
import Wrapper from 'blocks/Wrapper';

import { removeProduct, changeProductAmount } from 'actions/shoppingCart';
import { Products, Product } from 'components/shoppingCart/styles.js';
import NumericInput from 'components/NumericInput';

import { Address, Layout, Options, Summary } from './styles';

class Checkout extends Component {
    state = {
        payment: {
            selected: undefined,
            options: {}
        },
        delivery: {
            selected: undefined,
            options: {}
        },
        address: {
            firstname: { key: 'firstname', label: 'First Name', value: '' },
            lastname: { key: 'lastname', label: 'Last Name', value: '' },
            country: { key: 'country', label: 'Country', value: '' },
            city: { key: 'city', label: 'City', value: '' },
            zipCode: { key: 'zipCode', label: 'Zip Code', value: '' },
            road: { key: 'road', label: 'Road and number', value: '' },
            email: { key: 'email', label: 'E-Mail', value: '' },
            phone: { key: 'phone', label: 'Phone', value: '' },
        },
        daddress: {
            firstname: { key: 'firstname', label: 'First Name', value: '' },
            lastname: { key: 'lastname', label: 'Last Name', value: '' },
            country: { key: 'country', label: 'Country', value: '' },
            city: { key: 'city', label: 'City', value: '' },
            zipCode: { key: 'zipCode', label: 'Zip Code', value: '' },
            road: { key: 'road', label: 'Road and number', value: '' },
            email: { key: 'email', label: 'E-Mail', value: '' },
            phone: { key: 'phone', label: 'Phone', value: '' },
        },
        useAddressAsDeliveryAddress: true,
        canProceedToCheckout: false,
        isFetching: false,
        errors: []
    }

    componentDidMount = async () => {
        const payments_data = await axios.get('/api/payments')
        const payments = payments_data.data;
        const deliveries_data = await axios.get('/api/deliveries');
        const deliveries = deliveries_data.data;

        this.setState({
            payment: { ...this.state.payment, options: _.mapKeys(payments, '_id') },
            delivery: { ...this.state.delivery, options: _.mapKeys(deliveries, '_id') }
        })
    };

    componentDidUpdate(prevProps, prevState) {
        const validation = this.validate();
        if(validation !== this.state.canProceedToCheckout)
            this.setState({ canProceedToCheckout: validation })
    }

    changePayment = paymentId => {
        this.setState({ payment: { ...this.state.payment, selected: paymentId }} );
    };

    changeDelivery = deliveryId => {
        this.setState({ delivery: { ...this.state.delivery, selected: deliveryId }} );
    };

    onChangeAddress = (field, value) => {
        this.setState({ address: { ...this.state.address, [field]: { ...this.state.address[field], value} }} );
    };

    onChangeDeliveryAddress = (field, value) => {
        this.setState({ daddress: { ...this.state.daddress, [field]: { ...this.state.daddress[field], value} }} );
    };

    toggleDeliveryAddress = e => {
        this.setState({ useAddressAsDeliveryAddress: !this.state.useAddressAsDeliveryAddress });
    };

    validate = () => {
        const { state } = this;
        if(Object.values(this.props.cart.products).length === 0) return false;
        if(state.payment.selected === undefined) return false;
        if(state.delivery.selected === undefined) return false;
        if(!this.checkAddress(state.address)) return false;
        if(!state.useAddressAsDeliveryAddress &&
            !this.checkAddress(state.daddress)) return false;
        return true;
    };

    checkAddress = address => {
        return !Object.values(address).some(field => field.value === '');
    };

    proceedToCheckout = async e => {
        const products = Object.values(this.props.cart.products).map(product => ({
            product: product._id,
            size: product.size._id,
            amount: product.amount
        }));

        try {
            this.setState({ isFetching: true });
            const response = await axios.post('/api/orders', {
                products,
                delivery: this.state.delivery.selected,
                payment: this.state.payment.selected,
                client: this.state.address,
                address: this.state.useAddressAsDeliveryAddress ? this.state.address : this.state.daddress
            });
            const data = response.data;
            console.log(data);
            this.setState({ isFetching: false });
            this.props.history.push(`/checkout/payment/${data._id}?hash=${data.hash}`);
        } catch (e) {
            this.setState({ errors: e.response.data, isFetching: false })
        }
    };

    render() {
        const {
            payment,
            delivery,
            address,
            daddress,
            useAddressAsDeliveryAddress,
            canProceedToCheckout
        } = this.state;

        const price = {
            products: Object.values(this.props.cart.products).reduce((a, item) => a + (item.price * item.amount), 0),
            payment: payment.selected !== undefined ? payment.options[payment.selected].price : 0,
            delivery: delivery.selected !== undefined ? delivery.options[delivery.selected].price : 0
        };

        const errs = this.state.errors.map(error => ({ ...error, notavailable: error.amount > error.available }));
        const errors = _.mapKeys(errs, 'product');

        return (
            <Wrapper>
                <Spacer>&#10699;</Spacer>
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
                        Object.values(this.props.cart.products).map(product => (
                            <Product key={product._id}>
                                <td>
                                    <button
                                        onClick={() => this.props.removeProduct(product._id)}>
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </td>
                                <td><img src={product.pictures[0]} alt={product.name}/></td>
                                <td>
                                    { errors &&
                                    errors[product._id] &&
                                    errors[product._id].notavailable === true &&
                                    <i>Specified amount of this product is currently not available</i>
                                    }
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
                <Layout>
                    <Layout.Section>
                        <div>
                            <Layout.Section.Heading>Payment method:</Layout.Section.Heading>
                            <Options>
                                { _.get(payment, 'options', undefined) &&
                                Object.values(payment.options).map(option => (
                                    <Options.Item key={option._id}>
                                        <input
                                            id={option._id}
                                            type="radio"
                                            radioGroup="payment"
                                            checked={payment.selected === option._id}
                                            onChange={() => this.changePayment(option._id)}/>
                                        <label htmlFor={option._id}>
                                            <img src={option.icon} alt={option.name}/>
                                            <Options.Content>
                                                <Options.Name>{option.name}</Options.Name>
                                                <Options.Price>+&euro;{option.price}</Options.Price>
                                            </Options.Content>
                                        </label>
                                    </Options.Item>
                                ))
                                }
                            </Options>
                        </div>
                        { _.get(delivery, 'options', undefined) &&
                        _.get(payment, 'selected', undefined) !== undefined &&
                        <div>
                            <Layout.Section.Heading>Delivery:</Layout.Section.Heading>
                            <Options>
                                {
                                    Object.values(delivery.options).map(option => (
                                        <Options.Item key={option._id}>
                                            <input
                                                id={option._id}
                                                type="radio"
                                                radioGroup="delivery"
                                                checked={delivery.selected === option._id}
                                                onChange={() => this.changeDelivery(option._id)}/>
                                            <label htmlFor={option._id}>
                                                <img src={option.icon} alt={option.name}/>
                                                <Options.Content>
                                                    <Options.Name>{option.name}</Options.Name>
                                                    <Options.Price>+&euro;{option.price}</Options.Price>
                                                </Options.Content>
                                            </label>
                                        </Options.Item>
                                    ))
                                }
                            </Options>
                        </div>
                        }
                    </Layout.Section>
                    <Layout.Section>
                        { _.get(delivery, 'selected', undefined) !== undefined &&
                        <React.Fragment>
                            <Address>
                                <Layout.Section.Heading>Client address</Layout.Section.Heading>
                                <Address.Heading>&nbsp;</Address.Heading>
                                { address &&
                                Object.values(address).map((field, index) => (
                                    <Address.Field key={index}>
                                        <input
                                            type="text"
                                            placeholder={field.label}
                                            value={field.value}
                                            onChange={(e) => this.onChangeAddress(field.key, e.target.value)}/>
                                    </Address.Field>
                                ))
                                }
                            </Address>
                            <Address>
                                <Layout.Section.Heading>Delivery address</Layout.Section.Heading>
                                <Address.Heading>
                                    <input
                                        id="useAddressAsDeliveryAddress"
                                        type="checkbox"
                                        checked={useAddressAsDeliveryAddress}
                                        onChange={this.toggleDeliveryAddress}/>
                                    <label htmlFor="useAddressAsDeliveryAddress">Use client address</label>
                                </Address.Heading>
                                { daddress &&
                                Object.values(daddress).map((field, index) => (
                                    <Address.Field key={index}>
                                        <input
                                            type="text"
                                            placeholder={field.label}
                                            value={field.value}
                                            onChange={(e) => this.onChangeDeliveryAddress(field.key, e.target.value)}
                                            disabled={useAddressAsDeliveryAddress}/>
                                    </Address.Field>
                                ))
                                }
                            </Address>
                        </React.Fragment>
                        }
                    </Layout.Section>
                </Layout>
                <Summary>
                    <Summary.Parts>
                        <Summary.Part><span>Products price</span><span>{ price.products }</span></Summary.Part>
                        <Summary.Part><span>Payment price</span><span>{ price.payment }</span></Summary.Part>
                        <Summary.Part><span>Delivery price</span><span>{ price.delivery }</span></Summary.Part>
                        <Summary.Part total><span>Total price</span><span>{ price.products + price.payment + price.delivery }</span></Summary.Part>
                    </Summary.Parts>
                    <Summary.Button onClick={this.proceedToCheckout} disabled={!canProceedToCheckout}>
                        { this.state.isFetching === true ? 'Loading...' : 'Proceed to checkout'}
                    </Summary.Button>
                </Summary>
            </Wrapper>
        )
    }
}

const mapStateToProps = ({ cart }) => ({ cart });

export default connect(mapStateToProps, { removeProduct, changeProductAmount })(Checkout);