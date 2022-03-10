import React from 'react';
import { Link } from 'react-router-dom';

import CartIcon from '../../assets/cart.svg';

import { ROUTE_CART } from '../../routes';

import styles from './Cart.module.pcss';

function Cart(props) {
  const { numberOfProductsInCart } = props;

  return (
    <Link className={styles.button} to={ROUTE_CART}>
      <span className={styles.count}>{numberOfProductsInCart}</span>
      <img className={styles.image} src={CartIcon} alt="" />
    </Link>
  );
}

export default Cart;
