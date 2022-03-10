import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useDealersContext } from '../../context/dealers-context';

import { fetchGoods } from '../../store/actions/goods';
import { addProduct } from '../../store/actions/cart';

import Cart from '../../components/Cart/Cart';
import Preloader from '../../components/Preloader/Preloader';

import styles from './Goods.module.pcss';

function Goods() {
  const { dealers } = useDealersContext();
  const products = useSelector((state) => state.goods.data);
  const isLoading = useSelector((state) => state.goods.loading);
  const numberOfProductsInCart = useSelector(({ cart }) => cart.data.reduce((acc, item) => acc + Number(item.counter), 0));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGoods(dealers));
  }, []);

  const handleClickButtonAdd = (product) => {
    dispatch(addProduct(product));
  };

  return (
    <React.Fragment>
      <Cart numberOfProductsInCart={numberOfProductsInCart} />
      <h1>Список товаров</h1>
      {isLoading && (
        <Preloader />
      )}
      {products.length !== 0 && (
        <ul className={styles.list}>
          {
            products.map((product) => (
              <li key={product.name} className={styles.item}>
                <h2 className={styles.name}>{product.name}</h2>
                <span>{`${product.price} $`}</span>
                <img
                  className={styles.image}
                  src={`https://murmuring-tor-81614.herokuapp.com/${product.image}`}
                  alt=""
                />
                <button
                  className={styles.button}
                  type="button"
                  onClick={() => handleClickButtonAdd(product)}
                >
                  Добавить в корзину
                </button>
              </li>
            ))
          }
        </ul>
      )}
    </React.Fragment>
  );
}

export default Goods;
