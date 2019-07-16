import * as pieceUtils from './pieceUtils';
import * as Keys from './keys';
import * as Board from './board';

export default class Piece {
  private x: number;
  private y: number;
  private piece: number;
  private spin: number;

  constructor(x: number, y: number, piece: number, spin: number) {
    this.x = x;
    this.y = y;
    this.piece = (piece + pieceUtils.PIECES_NUM) % pieceUtils.PIECES_NUM;
    this.spin = (spin + pieceUtils.SPINS_NUM) % pieceUtils.SPINS_NUM;
  }

  unsetTo(board: Board.Type) {
    return pieceUtils.unSetPiece(board, this.x, this.y, this.piece, this.spin);
  }

  setTo(board: Board.Type) {
    return pieceUtils.setPiece(board, this.x, this.y, this.piece, this.spin);
  }

  canPut(board: Board.Type) {
    return pieceUtils.canPut(board, this.x, this.y, this.piece, this.spin);
  }

  tryPutTo(board: Board.Type, oldPiece: Piece) {
    const unsetBoard
          = pieceUtils.unSetPiece(board, oldPiece.x, oldPiece.y, oldPiece.piece, oldPiece.spin);
    if (this.canPut(unsetBoard)) {
      const newBoard = pieceUtils.setPiece(unsetBoard, this.x, this.y, this.piece, this.spin);
      return [newBoard, this];
    }
    return [board, oldPiece];
  }

  nextPiece(keyDownActionType: number) {
    switch (keyDownActionType) {
      case Keys.KEY_ARROW_LEFT:
        return new Piece(this.x - 1, this.y, this.piece, this.spin);
      case Keys.KEY_SPC:
      case Keys.KEY_ARROW_DOWN:
        return new Piece(this.x, this.y + 1, this.piece, this.spin);
      case Keys.KEY_ARROW_RIGHT:
        return new Piece(this.x + 1, this.y, this.piece, this.spin);
      case Keys.KEY_Z:
        return new Piece(this.x, this.y, this.piece, this.spin - 1);
      case Keys.KEY_X:
        return new Piece(this.x, this.y, this.piece, this.spin + 1);
      default:
        break;
    }
    return this;
  }

  reachedToBottom(board: Board.Type) {
    // eslint-disable-next-line
    const [_, piece] = new Piece(this.x, this.y + 1, this.piece, this.spin).tryPutTo(board, this);
    return piece === this;
  }
}
