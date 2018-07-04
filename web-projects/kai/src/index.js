// __webpack_public_path__ = CFG.__publicPath__;
import css from './index.less';
import React from 'react';
import ReactDom from 'react-dom';
import Router from './router';
import {Provider} from 'react-redux';
import store from 'store';

// console.log('-============', window.location);

ReactDom.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('root')
);