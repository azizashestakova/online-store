import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import cn from 'clsx';

import { deleteProduct, deleteProducts, updateProduct } from '../../store/actions/cart';

import { ROUTE_HOME } from '../../routes';

import styles from './Cart.module.pcss';

function Cart() {
  const productsInCart = useSelector((state) => state.cart.data);
  const totalSum = useSelector((state) => state.cart.data.reduce((acc, item) => acc + item.counter * item.price, 0));

  const dispatch = useDispatch();

  const handleClickButtonDelete = (product) => {
    dispatch(deleteProduct(product));
  };

  const handleClickButtonDeleteAll = () => {
    dispatch(deleteProducts());
  };

  const handleChangeCount = (event, productInCart) => {
    const targetValue = event.target.value;
    const value = targetValue.match(/\D/) || Number(targetValue) === 0 ? 1 : targetValue > 50 ? 50 : targetValue;

    dispatch(updateProduct({ ...productInCart, counter: value }));
  };

  return (
    <React.Fragment>
      <h1>Корзина</h1>
      <Link className={styles.back} to={ROUTE_HOME}>
        Вернуться к списку товаров
      </Link>
      {productsInCart.length === 0 && (
        <p className={styles.notification}>В корзине нет товаров</p>
      )}
      {productsInCart.length !== 0 && (
        <React.Fragment>
          <ul className={styles.list}>
            {
            productsInCart.map((productInCart, idx) => (
              <li className={styles.item} key={idx}>
                <img
                  className={styles.image}
                  src={`https://murmuring-tor-81614.herokuapp.com/${productInCart.image}`}
                  alt=""
                />
                <div className={styles.wrapper}>
                  <h2>{productInCart.name}</h2>
                  <span className={styles.price}>{`${productInCart.price} $`}</span>
                  <div>
                    <input
                      className={styles.amount}
                      value={productInCart.counter}
                      onChange={(event) => handleChangeCount(event, productInCart)}
                      type="number"
                      min="1"
                      max="50"
                    />
                  </div>
                </div>
                <button
                  className={cn(styles.delete, styles.deleteCustom)}
                  type="button"
                  onClick={() => handleClickButtonDelete(productInCart)}
                >Удалить
                </button>
              </li>
            ))
          }
          </ul>
          <div className={styles.footer}>
            <p className={styles.total}>
              Итого:
              <span className={styles.sum}>{` ${totalSum.toFixed(2)} $`}</span>
            </p>
            <button
              className={styles.delete}
              type="button"
              onClick={() => handleClickButtonDeleteAll()}
            >Удалить все товары
            </button>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default Cart;
