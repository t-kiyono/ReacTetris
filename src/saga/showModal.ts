import { put, race, take, select } from 'redux-saga/effects';

import Actions from '../actions';
import { MainState } from '../reducers';
import { AppState } from '../store';
import * as Keys from '../game/keys';
import { Modal } from '../reducers';

export function* showModal(modal: Modal) {
  const state: MainState = yield select((state: AppState) => state.main);
  const { gameRunning } = state;

  yield put(Actions.setModal(modal));
  yield put(Actions.setGameRunning(false));
  let answer;
  do {
    answer = yield race({
      ok: take(Actions.uiModalOk),
      cancel: take(Actions.uiModalCancel),
      keyDown: take(Actions.uiKeyDown),
    });
  } while (
    !answer.ok &&
    !answer.cancel &&
    !(answer.keyDown && answer.keyDown.payload === Keys.KEY_ENTER) &&
    !(answer.keyDown && answer.keyDown.payload === Keys.KEY_ESC)
  );
  yield put(Actions.setGameRunning(gameRunning));
  yield put(Actions.setModal({ show: false }));
  return answer;
}
