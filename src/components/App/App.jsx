import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useDealersContext } from "../../context/dealers-context";

import Goods from '../../pages/Goods/Goods';
import Cart from '../../pages/Cart/Cart';

import { ROUTE_HOME, ROUTE_CART } from '../../routes';

function App() {
  const { dealers } = useDealersContext();

  return (
    <BrowserRouter>
      <main className="main">
        <Routes>
          <Route path={ROUTE_HOME} element={<Goods dealers={dealers} />} />
          <Route path={ROUTE_CART} element={<Cart />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default hot(App);
