import actionCreatorFactory from 'typescript-fsa';
import { Modal } from '../reducers';
import Board from '../game/Board';
import Mino from '../game/Mino';

const actionCreator = actionCreatorFactory();

export default {
  uiKeyDown: actionCreator<number>('UI_KEY_DOWN'),
  uiModalOpen: actionCreator<Modal>('UI_MODAL_OPEN'),
  uiModalOk: actionCreator('UI_MODAL_OK'),
  uiModalCancel: actionCreator('UI_MODAL_CANCEL'),

  sysTimeTick: actionCreator<number>('SYS_TIME_TICK'),
  sysReachBottom: actionCreator('SYS_REACH_BOTTOM'),
  sysStickBottom: actionCreator('SYS_STICK_BOTTOM'),
  sysGameStart: actionCreator('SYS_GAME_START'),
  sysGameQuit: actionCreator('SYS_GAME_QUIT'),
  sysGameOver: actionCreator('SYS_GAME_OVER'),

  setBoard: actionCreator<Board>('SET_BOARD'),
  setMino: actionCreator<Mino>('SET_MINO'),
  setGameRunning: actionCreator<boolean>('SET_GAME_RUNNING'),
  setModal: actionCreator<Modal>('SET_MODAL'),
  setScore: actionCreator<number>('SET_SCORE'),
  addScore: actionCreator<number>('ADD_SCORE'),
}
