import { createStore, applyMiddleware, compose } from 'redux';
import reducers from 'reducers';
import thunk from 'redux-thunk';

// chrome redux 插件
const DevTools = window.devToolsExtension ? window.devToolsExtension : () => {};

let store = createStore(reducers, compose(
  applyMiddleware(thunk),
  DevTools(),
));

export default store;
