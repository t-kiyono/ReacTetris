import { createStore, combineReducers, applyMiddleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer';
import rootSaga from '../saga';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const middleWare = applyMiddleware(sagaMiddleware, routerMiddleware(history));
const devMiddleWare = composeWithDevTools(middleWare);

const store: Store = createStore(
  combineReducers({ main: reducer, router: connectRouter(history) }),
  process.env.NODE_ENV === 'development' ? devMiddleWare : middleWare
);

sagaMiddleware.run(rootSaga);

export default store;
