// import css from './index.less';
// __webpack_public_path__ = CFG.__publicPath__;
import React from 'react';
import ReactDom from 'react-dom';
import Login from './pages/login';

ReactDom.render(
  <Login />,
  document.getElementById('login')
);