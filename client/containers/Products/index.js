import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { pick, pickBy, identity } from 'lodash';
import styled from 'styled-components';
import { media } from 'utils/style-utils';
import qs from 'querystring';

import Spacer from 'blocks/Spacer';
import Wrapper from 'blocks/Wrapper';
import Filters from 'blocks/Filters';

import { ProductsList } from 'components/products';
import Paginator from 'components/Paginator';

import { fetchCategories } from 'actions/categoriesActions';
import { fetchProducts } from 'actions/productsActions';
import { fetchSizes } from 'actions/sizesActions';


const Layout = styled.div`
  display: grid;
  grid-template-columns: 300px auto;
  grid-column-gap: 2rem;
  grid-row-gap: 1rem;
   ${media.mobile`
    grid-template-columns: 1fr;
  `}
`
Layout.Left = styled.div`
`
Layout.Right = styled.div`
`


class Products extends Component {
    state = {
        category: '',
        size: '',
        priceFrom: '',
        priceTo: '',
        productsOnPage: 12,
        ppp: 12
    };

    componentDidMount() {
        this.props.fetchCategories();
        this.props.fetchSizes();
        this.fetchProducts();
    }

    componentDidUpdate(prevProps, prevState) {
        if((prevProps.location.search !== this.props.location.search) ||
            (prevState.productsOnPage !== this.state.productsOnPage))
            this.fetchProducts();
    }

    fetchProducts() {
        const { productsOnPage } = this.state;
        const search = qs.parse(this.props.location.search.slice(1));
        const query = pick(search, ['category', 'size', 'priceFrom', 'priceTo']);
        const page = search.page ? parseInt(search.page) : 0;

        this.props.fetchProducts({
            limit: productsOnPage,
            skip: page * productsOnPage,
            ...query
        })
    }

    changeCategory  = e => { this.setState({ category: e.target.value }) }
    changeSize      = e => { this.setState({ size: e.target.value }) }
    changePriceFrom = e => { this.setState({ priceFrom: e.target.value }) }
    changePriceTo   = e => { this.setState({ priceTo: e.target.value }) }
    changeProductsOnPage = e => { this.setState({ ppp: e.target.value }) }

    onFilter = e => {
        e.preventDefault();

        const ppp = this.state.ppp;
        if(!ppp || ppp <= 0)
            this.setState({ productsOnPage: 12, ppp: 12 });
        else
            this.setState({ productsOnPage: ppp });

        const options = {
            category: this.state.category,
            size: this.state.size,
            priceFrom: this.state.priceFrom,
            priceTo: this.state.priceTo,
        };

        const query = qs.stringify(pickBy(options, identity));
        this.props.history.push(`/products?${query}`)
    };

    navigateToPage = index => {
        const qr = qs.parse(this.props.location.search.slice(1));
        qr.page = index;
        const query = qs.stringify(qr);
        this.props.history.push(`/products?${query}`);
    };

    render() {
        const { priceFrom, priceTo, productsOnPage, ppp } = this.state;
        const { categories, products, sizes } = this.props;

        const query = qs.parse(this.props.location.search.slice(1));
        const current = query.page ? Number(query.page) : 0;
        const pages = products.total / productsOnPage;

        return (
            <Wrapper>
                <Spacer>&#10699;</Spacer>
                <Layout>
                    <Layout.Left>
                        <Filters>
                            <Filters.Section>
                                <Filters.Section.Header>Products on page</Filters.Section.Header>
                                <Filters.Section.Body>
                                    <input type="text" placeholder="Products on page" value={ppp} onChange={this.changeProductsOnPage}/>
                                </Filters.Section.Body>
                            </Filters.Section>
                            <Filters.Section>
                                <Filters.Section.Header>Categories</Filters.Section.Header>
                                <Filters.Section.Body>
                                    <select onChange={this.changeCategory} defaultValue="">
                                        <option value="">All Categories</option>
                                        { categories &&
                                        Object.values(categories.categories).map(category => (
                                            <option key={category._id} value={category._id}>{category.name}</option>
                                        ))
                                        }
                                    </select>
                                </Filters.Section.Body>
                            </Filters.Section>
                            <Filters.Section>
                                <Filters.Section.Header>Price</Filters.Section.Header>
                                <Filters.Section.Body>
                                    <input type="text" placeholder="From" value={priceFrom} onChange={this.changePriceFrom}/>
                                    <input type="text" placeholder="To" value={priceTo} onChange={this.changePriceTo}/>
                                </Filters.Section.Body>
                            </Filters.Section>
                            <Filters.Section>
                                <Filters.Section.Header>Size</Filters.Section.Header>
                                <Filters.Section.Body>
                                    <select onChange={this.changeSize} defaultValue="">
                                        <option value="">All Sizes</option>
                                        { sizes &&
                                        Object.values(sizes.sizes).map(size => (
                                            <option key={size._id} value={size._id}>Size: {size.short}</option>
                                        ))
                                        }
                                    </select>
                                </Filters.Section.Body>
                            </Filters.Section>
                            <Filters.Submit type="submit" onClick={this.onFilter}><i className="fas fa-filter"></i> Filter</Filters.Submit>
                        </Filters>
                    </Layout.Left>
                    <Layout.Right>
                        <ProductsList products={Object.values(products.products)}/>
                        <div>
                            {
                                <Paginator pages={pages} current={current} onItemClicked={(index) => this.navigateToPage(index)}/>
                            }
                        </div>
                    </Layout.Right>
                </Layout>
            </Wrapper>
        )
    }
}

const mapStateToProps =
    ({ categories, products, sizes }) =>
        ({ categories, products, sizes });

export default withRouter(connect(
    mapStateToProps,
    { fetchCategories, fetchProducts, fetchSizes }
)(Products));