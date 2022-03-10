import {
  ADD_PRODUCT, DELETE_PRODUCT, DELETE_PRODUCTS, UPDATE_PRODUCTS,
} from '../constants';

export function addProduct(product) {
  return (dispatch) => {
    dispatch({ type: ADD_PRODUCT, product });
  };
}

export function deleteProduct(product) {
  return (dispatch) => {
    dispatch({ type: DELETE_PRODUCT, product });
  };
}

export function deleteProducts() {
  return (dispatch) => {
    dispatch({ type: DELETE_PRODUCTS });
  };
}

export function updateProduct(product) {
  return (dispatch) => {
    dispatch({ type: UPDATE_PRODUCTS, product });
  };
}
