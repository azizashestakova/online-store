import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { DealersContext } from "./context/dealers-context";

import store from './store/store';

import App from './components/App/App';

import './styles/styles.pcss';

function startApp(dealers) {
  render(
    <DealersContext.Provider value={dealers}>
      <StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </StrictMode>
    </DealersContext.Provider>,
    document.getElementById("root")
  );
}

window.app = {
  startApp,
};
