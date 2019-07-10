import actionCreatorFactory from 'typescript-fsa';
import * as Board from '../game/borad';

const actionCreator = actionCreatorFactory();

interface UpdateCellPaylod {
  x: number;
  y: number;
  cell: number;
}

export default {
  uiButtonClicked: actionCreator<any>('UI_BUTTON_CLICKED'),
  uiKeyDown: actionCreator<number>('UI_KEY_DOWN'),
  uiModalOpen: actionCreator<any>('UI_MODAL_OPEN'),
  uiModalOk: actionCreator('UI_MODAL_OK'),
  uiModalCancel: actionCreator('UI_MODAL_CANCEL'),

  sysTimeTick: actionCreator<number>('SYS_TIME_TICK'),
  sysGameStart: actionCreator('SYS_GAME_START'),
  sysGameQuit: actionCreator('SYS_GAME_QUIT'),
  sysGameOver: actionCreator('SYS_GAME_OVER'),
  sysFixDownPiece: actionCreator('SYS_FIX_DOWN_PIECE'),

  updateCell: actionCreator<UpdateCellPaylod>('UPDATE_CELL'),
  setBoard: actionCreator<Board.Type>('SET_BOARD'),
  setCurrentPiece: actionCreator<any>('SET_CURRENT_PIECE'),
  setGameRunning: actionCreator<any>('SET_GAME_RUNNING'),
  setGamePausing: actionCreator<any>('SET_GAME_PAUSING'),
  setModal: actionCreator<any>('SET_MODAL'),
  setScore: actionCreator<any>('SET_SCORE'),
  addScore: actionCreator<any>('ADD_SCORE'),
}
