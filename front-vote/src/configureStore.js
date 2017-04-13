import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist'
import reducer from './reducers';
import promise from './promise';

const middleware = applyMiddleware(thunk, promise);

const configureStore = createStore(reducer, compose(middleware, window.devToolsExtension ? window.devToolsExtension() : f => f));

persistStore(configureStore);

export default configureStore;
