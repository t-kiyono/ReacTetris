import Board from './Board';
import { Pieces } from './Mino';

export const BOARD_W = 10;
export const BOARD_H = 20;
export const LINES_SCORE = [0, 40, 100, 300, 1200];
export const INITIAL_POS_X = 3;
export const INITIAL_BOARD = new Board(
  Array(BOARD_H).fill(
    Array(BOARD_W).fill(0)
  )
);
export const MINO_COLORS = ['cyan', 'yellow', 'green', 'red', 'blue', 'orange', 'purple'];
export const MINO: Array<Pieces> = [
  [
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
    ],
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
    ],
    [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ],
  ],
  [
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 2, 2, 0],
      [0, 2, 2, 0],
    ],
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 2, 2, 0],
      [0, 2, 2, 0],
    ],
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 2, 2, 0],
      [0, 2, 2, 0],
    ],
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 2, 2, 0],
      [0, 2, 2, 0],
    ],
  ],
  [
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 3, 3, 0],
      [3, 3, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [0, 3, 0, 0],
      [0, 3, 3, 0],
      [0, 0, 3, 0],
    ],
    [
      [0, 0, 0, 0],
      [0, 3, 3, 0],
      [3, 3, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [3, 0, 0, 0],
      [3, 3, 0, 0],
      [0, 3, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
  [
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [4, 4, 0, 0],
      [0, 4, 4, 0],
    ],
    [
      [0, 0, 0, 0],
      [0, 0, 4, 0],
      [0, 4, 4, 0],
      [0, 4, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [4, 4, 0, 0],
      [0, 4, 4, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 4, 0, 0],
      [4, 4, 0, 0],
      [4, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
  [
    [
      [0, 0, 0, 0],
      [5, 0, 0, 0],
      [5, 5, 5, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [0, 5, 5, 0],
      [0, 5, 0, 0],
      [0, 5, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [5, 5, 5, 0],
      [0, 0, 5, 0],
    ],
    [
      [0, 0, 0, 0],
      [0, 5, 0, 0],
      [0, 5, 0, 0],
      [5, 5, 0, 0],
    ],
  ],
  [
    [
      [0, 0, 0, 0],
      [0, 0, 6, 0],
      [6, 6, 6, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [0, 6, 0, 0],
      [0, 6, 0, 0],
      [0, 6, 6, 0],
    ],
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [6, 6, 6, 0],
      [6, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [6, 6, 0, 0],
      [0, 6, 0, 0],
      [0, 6, 0, 0],
    ],
  ],
  [
    [
      [0, 0, 0, 0],
      [0, 7, 0, 0],
      [7, 7, 7, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [0, 7, 0, 0],
      [0, 7, 7, 0],
      [0, 7, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [7, 7, 7, 0],
      [0, 7, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [0, 7, 0, 0],
      [7, 7, 0, 0],
      [0, 7, 0, 0],
    ],
  ],
];
