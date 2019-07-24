import Mino from "./Mino";

type Cells = Array<Array<number>>;

export default class Board {
  readonly cells: Cells;

  constructor(cells: Cells) {
    this.cells = cells;
  }

  update(mino: Mino): [Board, number] {
    const newBoard = mino.compose(this);

    let n = 0;
    for (let y = mino.y + 3; y >= mino.y; y--) {
      if (newBoard.cells[y] && newBoard.cells[y].every(e => e !== 0)) {
        n++;
        for (let yy = y; yy >= 0; yy--) {
          if (yy > 0) {
            newBoard.cells[yy] = newBoard.cells[yy - 1];
          } else {
            newBoard.cells[yy] = Array(newBoard.cells[0].length).fill(0);
          }
        }
        y++;
      }
    }

    return [newBoard, n]
  }

}