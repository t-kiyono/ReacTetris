import { cancel, fork, put, race, take } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import Actions from '../actions';
import { game, gameOver } from './game';
import * as Keys from '../game/keys';
import { uiHandler } from './uiHandler';

export default function* rootSaga() {
  yield fork(uiHandler);
  while (true) {
    yield put(push('/'));
    yield put(Actions.setScore(0));
    while ((yield take(Actions.uiKeyDown)).payload !== Keys.KEY_S) {
      // NO-OP
    }
    // ゲーム開始
    yield put(Actions.setGameRunning(true));
    yield put(push('/game'));
    const gameTask = yield fork(game);
    // ゲームオーバー、もしくはQ押下を待つ
    const gameResult = yield race({
      over: take(Actions.sysGameOver),
      quit: take(Actions.sysGameQuit)
    });
    yield cancel(gameTask);
    yield put(Actions.setGameRunning(false));
    if (gameResult.over) {
      // ゲームオーバー画面（確認ダイアログ）表示
      yield* gameOver();
    }
  }
}
