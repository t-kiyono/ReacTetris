import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { initialState } from './state';
import Actions from './actions';
import * as Board from '../game/borad';

export default reducerWithInitialState(initialState)
  .case(Actions.uiButtonClicked, (state) => {
    return state;
  })
  .case(Actions.updateCell, (state, payload) => {
    const { x, y, cell } = payload;
    return {
      ...state,
      board: Board.updateCell(state.board, x, y, cell),
    };
  })
  .case(Actions.setBoard, (state, payload) => {
    return {
      ...state,
      board: payload
    };
  })
  .case(Actions.setCurrentPiece, (state, payload) => {
    return {
      ...state,
      currentPiece: payload
    };
  })
  .case(Actions.setGameRunning, (state, payload) => {
    return {
      ...state,
      gameRunning: payload
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
    const score = state.score + payload;
    return {
      ...state,
      score,
      highScore: Math.max(score, state.highScore)
    };
  });
