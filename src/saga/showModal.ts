import { put, race, take } from 'redux-saga/effects';
import Actions from '../store/actions';
import * as Keys from '../game/keys';

interface ShowModal {
  title: string,
  cancelable?: boolean;
};

export function* showModal({ title, cancelable = false }: ShowModal) {
  yield put(Actions.setModal({ show: true, title, cancelable }));
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
  yield put(Actions.setModal({ show: false }));
  return answer;
}
