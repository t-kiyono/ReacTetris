import { fork, takeLatest } from 'redux-saga/effects';
import { game } from './game';
import { demoScreen } from './demoScreen';
import Actions from '../store/actions';

export default function* rootSaga() {
  yield fork(demoScreen);
  yield takeLatest(Actions.sysGameStart, game);
}
