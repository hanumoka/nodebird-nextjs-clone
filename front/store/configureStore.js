import { createWrapper } from 'next-redux-wrapper';
import { createStore } from 'redux';
import rootReducer from '../reducers';

const configureStore = () => {
  const store = createStore(rootReducer);
  return store;
};

const wrapper = createWrapper(configureStore, { debug: process.env.NODE_ENV === 'development' });

export default wrapper;