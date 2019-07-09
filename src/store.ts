import { createStore, combineReducers, applyMiddleware, Store } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';
import { any } from 'prop-types';

const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

export interface State {
  board: any;
  captureKeys: Array<string>;
  modal: {
    show: boolean;
    okButtonText: 'OK';
    cancelButtonText: 'Cancel';
  };
  score: number;
  highScore: number;
}

const store: Store<State> = createStore(
  combineReducers({ main: reducer, router: routerMiddleware}),
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga);

export default store;
