import * as TYPES from './constants/productsConstants';
import axios from 'axios';

export const fetchProducts =(filter = {}) => {
  return async dispatch => {
      dispatch(requestProducts(filter));
      try {
          const res = await axios.get('/api/products', { params: {...filter }});
          const products = res.data;
          dispatch(receiveProducts(products));
      } catch(e) {
          console.log( 'Error: ', e);
      }
  }
};

export const requestProducts = (filter) => ({
    type: TYPES.REQUEST_PRODUCTS,
    payload: filter
});
export const receiveProducts = (products) => ({
    type: TYPES.RECEIVE_PRODUCTS,
    payload: products
});

export const fetchProduct = (id) => {
    return async dispatch => {
        dispatch(requestProduct(id));
        const res = await axios.get(`/api/products/${id}`);
        const product = res.data;
        dispatch(receiveProduct(product));
    }
};
export const requestProduct = (id) => ({
    type: TYPES.REQUEST_PRODUCT,
    payload: id
});
export const receiveProduct = (product) => ({
    type: TYPES.RECEIVE_PRODUCT,
    payload: product
});

export const createProduct = (data) => {
    return async dispatch => {
        const res = await axios.post('/api/products', data);
        const product = res.data;
        dispatch(receiveProduct(product));
    }
};

export const updateProduct = (id, data) => {
    return async dispatch => {
        const res = await axios.put(`/api/products/${id}`, data);
        const product = res.data;
        dispatch(receiveProduct(product));
    }
};

export const deleteProduct = (id) => {
    return async dispatch => {
        const res = await axios.delete(`/api/products/${id}`);
        const deleted = res.data;
        if(deleted.n === 1 && deleted.ok === 1)
            dispatch(deletedProduct(id));
    }
};

export const deletedProduct = (id) => ({
    type: TYPES.DELETE_PRODUCT,
    payload: id
});

export const createProductAvailability = (product, size, amount) => {
    return async dispatch => {
        const res = await axios.post('/api/available', { product, size, amount });
        const availability = res.data;
        dispatch(fetchProduct(availability.product));
    }
};

export const updateProductAvailability = (availabilityId, size, amount) => {
    return async dispatch => {
        const res = await axios.put(`/api/available/${availabilityId}`, { size, amount });
        const availability = res.data;
        dispatch(fetchProduct(availability.product));
    }
};

export const deleteProductAvailability = (availabilityId, productId) => {
    return async dispatch => {
        const res = await axios.delete(`/api/available/${availabilityId}`);
        const deleted = res.data;
        if(deleted.n === 1 && deleted.ok === 1)
            dispatch(fetchProduct(productId));
    }
};
