export const localStorageMiddleware = (state) => (next) => (action) => {
  const result = next(action);

  if (result.type.includes('PRODUCT')) {
    localStorage.setItem('cart', JSON.stringify(state.getState().cart.data));
  }

  return result;
};

export const loadState = () => {
  const state = localStorage.getItem('cart');

  return state !== null ? JSON.parse(state) : [];
};

export const removeState = () => {
  localStorage.removeItem('cart');

  return [];
};
