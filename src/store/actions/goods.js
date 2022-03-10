import {
  LOADING_GOODS, LOAD_GOODS_SUCCESS, LOAD_GOODS_ERROR, API_URL,
} from '../constants';

export function fetchGoods(dealers) {
  const dealerIds = `?dealers=${dealers.join()}`;
  return (dispatch) => {
    dispatch({ type: LOADING_GOODS });
    return fetch(`${API_URL}/goods/${dealers.length !== 0 ? dealerIds : ''}`)
      .then((response) => response.json())
      .then((goods) => {
        dispatch({
          type: LOAD_GOODS_SUCCESS,
          goods,
        });
      })
      .catch((error) => {
        dispatch({
          type: LOAD_GOODS_ERROR,
          error,
        });
      });
  };
}
