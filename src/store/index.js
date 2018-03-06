import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const store = createStore(
  reducers,
  {}, // initial state
  compose(
    applyMiddleware(thunk),
  ),
);

export default store;
