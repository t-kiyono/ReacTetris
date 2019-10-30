import { reducerWithInitialState } from 'typescript-fsa-reducers';
import Actions from '../actions';
import { INITIAL_BOARD } from '../game/config';
import Board from '../game/Board';
import Mino from '../game/Mino';

export interface Modal {
  show: boolean;
  cancelable?: boolean;
  okButtonText?: string;
  cancelButtonText?: string;
  title?: string;
  content?: any;
}

export interface MainState {
  modal: Modal;
  board: Board;
  mino?: Mino;
  gameRunning: boolean;
  gameSpeed: number;
  score: number;
  highScore: number;
  level: number;
}

const initialState: MainState = {
  modal: {
    show: false,
    okButtonText: 'OK',
    cancelButtonText: 'Cancel',
    cancelable: true
  },
  board: INITIAL_BOARD,
  gameRunning: false,
  gameSpeed: 60,
  score: 0,
  highScore: 0,
  level: 1
};

export default reducerWithInitialState(initialState)
  .case(Actions.setBoard, (state, payload) => {
    return {
      ...state,
      mino: undefined,
      board: payload
    };
  })
  .case(Actions.setMino, (state, payload) => {
    return {
      ...state,
      mino: payload
    };
  })
  .case(Actions.setModal, (state, payload) => {
    return {
      ...state,
      modal: payload
    };
  })
  .case(Actions.setScore, (state, payload) => {
    return {
      ...state,
      score: payload,
      highScore: Math.max(payload, state.highScore)
    };
  })
  .case(Actions.addScore, (state, payload) => {
    const score = payload + state.score;
    return {
      ...state,
      score,
      highScore: Math.max(score, state.highScore)
    };
  })
  .case(Actions.setLevel, (state, payload) => {
    return {
      ...state,
      level: payload
    }
  })
  .case(Actions.setGameSpeed, (state, payload) => {
    return {
      ...state,
      gameSpeed: payload
    }
  })
  .case(Actions.setGameRunning, (state, payload) => {
    return {
      ...state,
      gameRunning: payload
    };
  })
  ;
