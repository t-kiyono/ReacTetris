import { put, race, take, select, fork, cancel } from 'redux-saga/effects';

import Actions from '../actions';
import { MainState } from '../reducers';
import Store, { AppState } from '../store';
import { showModal } from './showModal';
import * as Config from '../game/config';
import * as Keys from '../game/keys';
import Mino from '../game/Mino';

const SLACK_TIME = 30;

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

function* newMino() {
  const mino = new Mino(Config.MINO[Math.floor(Math.random() * 7)]);
  yield put(Actions.setMino(mino));
}

function* stickBottom() {
  yield take(Actions.sysStickBottom);

  const state: MainState = yield select((state: AppState) => state.main);
  const { mino, board, score } = state;

  if (mino) {
    const [newBoard, cleardLines] =  board.update(mino);
    for (let x = Config.INITIAL_POS_X; x < Config.INITIAL_POS_X + 4; x++) {
      if (newBoard.cells[0][x] !== 0) {
        yield put(Actions.sysGameOver());
      }
    }
    yield put(Actions.setBoard(newBoard));
    yield put(Actions.addScore(Config.LINES_SCORE[cleardLines]));

    const newScore = score + Config.LINES_SCORE[cleardLines];
    const newLevel = 1 + Math.floor(newScore / 1000);

    const coefficient = 2;
    if (newLevel * coefficient < 60) {
      const newGameSpeed = 60 - newLevel * coefficient;

      yield put(Actions.setLevel(newLevel));
      yield put(Actions.setGameSpeed(newGameSpeed));
    }
  }
}

export function* fallDown() {
  const state: MainState = yield select((state: AppState) => state.main);
  const { gameRunning, mino, board } = state;

  if (gameRunning && mino && mino.move(board, 0, 1)) {
    yield put(Actions.setMino(mino));
    yield put(Actions.addScore(1));
  }
}

export function* moveLeft() {
  const state: MainState = yield select((state: AppState) => state.main);
  const { gameRunning, mino, board } = state;

  if (gameRunning && mino && mino.move(board, -1, 0)) {
    yield put(Actions.setMino(mino));
  }
}

export function* moveRight() {
  const state: MainState = yield select((state: AppState) => state.main);
  const { gameRunning, mino, board } = state;

  if (gameRunning && mino && mino.move(board, 1, 0)) {
    yield put(Actions.setMino(mino));
  }
}

export function* rotate() {
  const state: MainState = yield select((state: AppState) => state.main);
  const { gameRunning, mino, board } = state;

  if (gameRunning && mino) {
    mino.rotate(board);
    yield put(Actions.setMino(mino));
  }
}

export function* gameQuit() {
  const state: MainState = yield select((state: AppState) => state.main);
  const { gameRunning } = state;

  if (gameRunning) {
    const answer = yield* showModal({
      show: true,
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
}

export function* gamePause() {
  const state: MainState = yield select((state: AppState) => state.main);
  const { gameRunning } = state;

  if (gameRunning) {
    yield* showModal({ show: true, title: 'PAUSE' });
  }
}

export function* gameOver() {
  yield* showModal({ show: true, title: 'GAME OVER' });
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
    while (yield select(state => state.main.gameRunning)) {
      yield* newMino();
      yield* stickBottom();
    }
  } finally {
    window.cancelAnimationFrame(requestId);
  }
}
