import * as Board from '../game/borad';

export interface AppState {
  main: MainState;
  router: any;
}

export interface MainState {
  board: Board.Type;
  currentPiece?: any;
  gameRunning?: boolean;
  modal: {
    show: boolean;
    okButtonText: string;
    cancelButtonText: string;
    cancelable?: boolean;
    title?: string;
    content?: string;
  },
  score: number;
  highScore: number;
}

export const initialState: MainState = {
  board: Board.INITIAL_BOARD,
  modal: {
    show: false,
    okButtonText: 'OK',
    cancelButtonText: 'Cancel'
  },
  score: 0,
  highScore: 0
}
