import { put, race, take, select, fork, cancel } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { showModal } from './showModal';
import Actions from '../store/actions';
import * as Config from '../game/config';
import * as Keys from '../game/keys';
import * as Board from '../game/board';
import Piece from '../game/Piece';
import Store from '../store';

const SLACK_TIME = 30;

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
      yield put(Actions.sysFixDownPiece());
      return;
    }
    if (timeTick) {
      slackTime -= 1;
    }
  }
}

function* pieceFall() {
  let piece = new Piece(3, 1, Math.floor(Math.random() * 7), 0);
  let board = yield select(state => state.main.board);
  if (!piece.canPut(board)) {
    // トップの位置に置けなければゲームオーバー
    yield put(Actions.sysGameOver());
    return;
  }
  yield put(Actions.setCurrentPiece(piece));

  let stcTask = null;
  while (true) {
    const { keyDown, fixDown, timeTick } = yield race({
      keyDown: take(Actions.uiKeyDown),
      fixDown: take(Actions.sysFixDownPiece),
      timeTick: take(Actions.sysTimeTick),
    });
    if (fixDown) {
      board = piece.setTo(board);
      const { newBoard, cleardLines } = Board.clearLines(board);
      board = newBoard;
      yield put(Actions.setBoard(board));
      yield put(Actions.addScore(Config.LINES_SCORE[cleardLines]));
      break;
    }
    // 固定時間処理タスクを起動
    if (piece.reachedToBottom(board)) {
      if (stcTask === null) {
        stcTask = yield fork(slackTimeChecker);
      }
    } else if (stcTask !== null) {
      // 固定時間中の操作で底から脱却したときは固定時間を抜ける
      yield cancel(stcTask);
      stcTask = null;
    }
    if (keyDown) {
      if (keyDown.payload === Keys.KEY_Q) {
        yield* gameQuit();
      } else if (keyDown.payload === Keys.KEY_P) {
        yield* gamePause();
      }
    }
    if (keyDown || (timeTick && timeTick.payload % 60 === 0)) {
      const nextPiece = piece.nextPiece(
        (keyDown && keyDown.payload) || Keys.KEY_ARROW_DOWN
      );
      if (nextPiece.canPut(board)) {
        if (
          nextPiece !== piece &&
          keyDown &&
          keyDown.payload === Keys.KEY_ARROW_DOWN
        ) {
          yield put(Actions.addScore(1));
        }
        piece = nextPiece;
        yield put(Actions.setCurrentPiece(piece));
      }
    }
  }
}

export function* game() {
  yield put(push('/game'));

  yield put(Actions.setBoard(Board.INITIAL_BOARD));
  yield put(Actions.setScore(0));

  let requestId = 0;
  let n = 0;

  try {
    const loop = () => {
      Store.dispatch(Actions.sysTimeTick(n++));
      requestId = window.requestAnimationFrame(loop);
    };
    window.requestAnimationFrame(loop);

    while (yield select(state => state.main.gameRunning)) {
      yield* pieceFall();
    }
  } finally {
    window.cancelAnimationFrame(requestId);
  }
}
