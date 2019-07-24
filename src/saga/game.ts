import { put, race, take, select, fork, cancel } from 'redux-saga/effects';

import Actions from '../actions';
import { MainState } from '../reducers';
import Store, { AppState } from '../store';
import { showModal } from './showModal';
import * as Config from '../game/config';
import * as Keys from '../game/keys';
import Mino from '../game/Mino';

const SLACK_TIME = 30;

function* slackTimeChecker() {
  let slackTime = SLACK_TIME;
  while (true) {
    const { keyDown, timeTick } = yield race({
      keyDown: take(Actions.uiKeyDown),
      timeTick: take(Actions.sysTimeTick),
    });
    if (
      slackTime === 0 ||
      (keyDown && keyDown.payload === Keys.KEY_ARROW_DOWN)
    ) {
      yield put(Actions.sysStickBottom());
      break;
    }
    if (timeTick) {
      slackTime -= 1;
    }
  }
}

function* timer() {
  let stcTask;
  while (true) {
    const timeTick = yield take(Actions.sysTimeTick)
    const state: MainState = yield select((state: AppState) => state.main);
    const { mino, board, gameSpeed, gameRunning } = state;
    if (!mino || !gameRunning) continue;

    if (!mino.isReachedBottom(board)) {
      if (timeTick.payload % gameSpeed === 0) {
        yield* fallDown();
      }
      if (stcTask && stcTask.isRunning()) {
        yield cancel(stcTask);
      }
    } else {
      if (!stcTask || !stcTask.isRunning()) {
        stcTask = yield fork(slackTimeChecker);
      }
    }
  }
}

function* keyHandler() {
  while(true) {
    const keyDown = yield take(Actions.uiKeyDown);
    const key = keyDown.payload;

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
}

function* fallDown() {
  const state: MainState = yield select((state: AppState) => state.main);
  const { mino, board } = state;

  if (mino && mino.move(board, 0, 1)) {
    yield put(Actions.setMino(mino));
    yield put(Actions.addScore(1));
  }
}

function* moveLeft() {
  const state: MainState = yield select((state: AppState) => state.main);
  const { mino, board } = state;

  if (mino && mino.move(board, -1, 0)) {
    yield put(Actions.setMino(mino));
  }
}

function* moveRight() {
  const state: MainState = yield select((state: AppState) => state.main);
  const { mino, board } = state;

  if (mino && mino.move(board, 1, 0)) {
    yield put(Actions.setMino(mino));
  }
}

function* rotate() {
  const state: MainState = yield select((state: AppState) => state.main);
  const { mino, board } = state;

  if (mino) {
    mino.rotate(board);
    yield put(Actions.setMino(mino));
  }
}

function* gameQuit() {
  const answer = yield* showModal({
    title: 'QUIT THE GAME?',
    cancelable: true,
  });
  if (
    answer.ok ||
    (answer.keyDown && answer.keyDown.payload === Keys.KEY_ENTER)
  ) {
    yield put(Actions.sysGameQuit());
  }
}

function* gamePause() {
  yield* showModal({ title: 'PAUSE' });
}

function* newMino() {
  const mino = new Mino(Config.MINO[Math.floor(Math.random() * 7)]);
  yield put(Actions.setMino(mino));
}

function* stickBottom() {
  yield take(Actions.sysStickBottom);

  const state: MainState = yield select((state: AppState) => state.main);
  const { mino, board } = state;

  if (mino) {
    const [newBoard, cleardLines] =  board.update(mino);
    for (let x = Config.INITIAL_POS_X; x < Config.INITIAL_POS_X + 4; x++) {
      if (newBoard.cells[0][x] !== 0) {
        yield put(Actions.sysGameOver());
      }
    }
    yield put(Actions.setBoard(newBoard));
    yield put(Actions.addScore(Config.LINES_SCORE[cleardLines]));
  }
}

export function* game() {
  yield put(Actions.setBoard(Config.INITIAL_BOARD));

  let requestId = 0;
  let n = 0;

  try {
    const loop = () => {
      requestId = window.requestAnimationFrame(loop);
      Store.dispatch(Actions.sysTimeTick(n++));
    };
    loop();

    yield fork(timer);
    yield fork(fallDown);
    yield fork(keyHandler);
    while (yield select(state => state.main.gameRunning)) {
      yield* newMino();
      yield* stickBottom();
    }
  } finally {
    window.cancelAnimationFrame(requestId);
  }
}
