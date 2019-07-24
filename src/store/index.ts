import { createStore, combineReducers, applyMiddleware, Store } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import reducer, { MainState } from '../reducers';
import rootSaga from '../saga';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const middleWare = applyMiddleware(sagaMiddleware, routerMiddleware(history));

const store: Store = createStore(
  combineReducers({ main: reducer, router: connectRouter(history) }),
  middleWare
);

sagaMiddleware.run(rootSaga);

export interface AppState {
  main: MainState;
  router: any;
}

export default store;
