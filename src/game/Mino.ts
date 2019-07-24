import Board from './Board';
import { BOARD_W, INITIAL_POS_X } from './config';

type Piece = [
  [number, number, number, number],
  [number, number, number, number],
  [number, number, number, number],
  [number, number, number, number],
];

export type Pieces = [ Piece, Piece, Piece, Piece ];

export default class Mino {
  private pieces: Pieces;
  private pieceIdx: number;
  private posX: number;
  private posY: number;
  
  constructor(pieces: Pieces) {
    this.pieces = pieces;
    this.pieceIdx = 0;
    this.posX = INITIAL_POS_X;
    this.posY = -3;
  }

  get x() {
    return this.posX;
  }
  
  get y() {
    return this.posY;
  }

  move(board: Board, x: number, y: number) {
    if (this.valid(board, this.pieces[this.pieceIdx], x, y)) {
      this.posX += x;
      this.posY += y;
      return true;
    } else {
      return false;
    }
  }

  rotate(board: Board) {
    const nextIdx = (this.pieceIdx + 1) % 4;
    if (this.valid(board, this.pieces[nextIdx], 0, 0)) {
      this.pieceIdx = nextIdx;
    }
  }

  isReachedBottom(board: Board) {
    return !this.valid(board, this.pieces[this.pieceIdx], 0, 1);
  }

  compose(board: Board) {
    const newCells = board.cells.map(e => e.slice(0));
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        if (typeof newCells[y + this.posY] !== 'undefined' && typeof newCells[y + this.posY][x + this.posX] !== 'undefined') {
          newCells[y + this.posY][x + this.posX] += this.pieces[this.pieceIdx][y][x];
        }
      }
    }
    return new Board(newCells);
  }

  private valid(board: Board, piece: Piece, offsetX: number, offsetY: number) {
    const newX = this.posX + offsetX;
    const newY = this.posY + offsetY;

    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        if (newY + y < 0 && newX + x >= 0 && newX + x < BOARD_W) continue;
        if (piece[y][x] !== 0) {
          if (typeof board.cells[newY + y] === 'undefined'
           || typeof board.cells[newY + y][newX + x] === 'undefined'
           || board.cells[newY + y][newX + x] !== 0) {
             return false;
           }
        }
      }
    }

    return true;
  }

}
