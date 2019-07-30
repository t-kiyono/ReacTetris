import { race, take } from 'redux-saga/effects';

import Actions from '../actions';
import * as Keys from '../game/keys';
import { fallDown, moveLeft, moveRight, rotate, gameQuit, gamePause } from './game';
import { showModal } from './showModal';

export function* uiHandler() {
  while(true) {
    const { uiKeyDown, uiShowModal } = yield race({
      uiKeyDown: take(Actions.uiKeyDown),
      uiShowModal: take(Actions.uiModalOpen),
    });

    if (uiKeyDown) {
      const key = uiKeyDown.payload;

      switch (key) {
        case Keys.KEY_ARROW_DOWN:
          yield* fallDown();
          break;
        case Keys.KEY_ARROW_LEFT:
          yield* moveLeft();
          break;
        case Keys.KEY_ARROW_RIGHT:
          yield* moveRight();
          break;
        case Keys.KEY_ARROW_UP:
          yield* rotate();
          break;
        case Keys.KEY_Q:
          yield* gameQuit();
          break;
        case Keys.KEY_P:
          yield* gamePause();
          break;
      }
    }

    if (uiShowModal) {
      const modal = uiShowModal.payload;
      yield* showModal(modal)
    }
  }
}
