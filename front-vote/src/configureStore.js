import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { autoRehydrate, persistStore } from 'redux-persist'
import reducer from './reducers';
import promise from './promise';

const middleware = applyMiddleware(thunk, promise);

const configureStore = createStore(reducer, compose(middleware, window.devToolsExtension ? window.devToolsExtension() : f => f),autoRehydrate());

persistStore(configureStore);

export default configureStore;
