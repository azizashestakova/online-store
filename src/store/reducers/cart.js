import {
  ADD_PRODUCT, DELETE_PRODUCT, DELETE_PRODUCTS, UPDATE_PRODUCTS,
} from '../constants';
import { loadState, removeState } from '../middleware/local-storage';
import { findIndexItemByName, deleteItemByName } from '../../utils/utils';

export const initialState = {
  data: loadState(),
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      if (findIndexItemByName(state.data, action.product) >= 0) {
        state.data[findIndexItemByName(state.data, action.product)].counter++;
      } else {
        state.data.push({ ...action.product, counter: 1 });
      }
      return {
        ...state,
        data: state.data,
      };
    case DELETE_PRODUCT: {
      let newState;
      if (state.data[findIndexItemByName(state.data, action.product)].counter <= 1) {
        newState = deleteItemByName(state.data, action.product);
      } else {
        newState = state.data.map((product, idx) => (
          idx === findIndexItemByName(state.data, action.product) ? Object.defineProperty(product, 'counter', {
            value: product.counter - 1,
          }) : product
        ));
      }
      return {
        ...state,
        data: newState,
      };
    }
    case DELETE_PRODUCTS: {
      return {
        ...state,
        data: removeState(),
      };
    }
    case UPDATE_PRODUCTS: {
      let newState = state.data.map((product, idx) => (
        idx === findIndexItemByName(state.data, action.product) ? Object.defineProperty(product, 'counter', {
          value: action.product.counter,
        }) : product
      ));
      return {
        ...state,
        data: newState,
      };
    }

    default:
      return state;
  }
}
