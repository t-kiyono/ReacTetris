import { put, race, take } from 'redux-saga/effects';
import Actions from '../actions';
import * as Keys from '../game/keys';
import { Modal } from '../reducers';

export function* showModal(modal: Modal) {
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
  yield put(Actions.setGameRunning(true));
  yield put(Actions.setModal({ show: false }));
  return answer;
}
