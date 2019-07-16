import { put, take, race } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import Actions from '../store/actions';
import * as Keys from '../game/keys';
import { showModal } from './showModal';

function* gameOver() {
  yield* showModal({ title: 'GAME OVER' });
}

export function* demoScreen() {
  yield put(push('/'));

  while (true) {
    while ((yield take(Actions.uiKeyDown)).payload !== Keys.KEY_S) {
      // NO-OP
    }
    // ゲーム開始
    yield put(Actions.setGameRunning(true));
    yield put(Actions.sysGameStart());
    // ゲームオーバー、もしくはQ押下を待つ
    const gameResult = yield race({
      over: take(Actions.sysGameOver),
      quit: take(Actions.sysGameQuit)
    });
    yield put(Actions.setGameRunning(false));
    if (gameResult.over) {
      // ゲームオーバー画面（確認ダイアログ）表示
      yield* gameOver();
    }
    yield put(push('/'));
  }
}
