import { LOADING_GOODS, LOAD_GOODS_SUCCESS, LOAD_GOODS_ERROR } from '../constants';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_GOODS:
      return { ...state, loading: true };
    case LOAD_GOODS_SUCCESS:
      return {
        ...state,
        data: action.goods,
        loading: false,
      };
    case LOAD_GOODS_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}
