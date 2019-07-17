import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';

import { AppState } from '../store';
import { BOARD_W, BOARD_H, MINO_COLORS } from '../game/config';
import Board from '../game/Board';

const CANVAS_W = 300, CANVAS_H = 600;
const BLOCK_W = CANVAS_W / BOARD_W; 
const BLOCK_H = CANVAS_H / BOARD_H;

function render(canvas: HTMLCanvasElement, board: Board) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
  ctx.strokeStyle = 'black';

  for (let y = 0; y < BOARD_H; y++) {
    for (let x = 0; x < BOARD_W; x++) {
      if (board.cells[y][x]) {
        ctx.fillStyle = MINO_COLORS[board.cells[y][x] - 1];
        drawBlock(ctx, x, y);
      }
    }
  }
}

function drawBlock(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillRect(BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1, BLOCK_H - 1);
  ctx.strokeRect(BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1, BLOCK_H - 1);
}

const GameCanvas = styled('canvas')({
  margin: 'auto',
  border: '1px solid black',
});

const Game: React.FC = () => {
  const [mino, board] = useSelector((state: AppState) => [state.main.mino, state.main.board]);
  const canvasEl = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasEl && canvasEl.current && mino) {
      render(canvasEl.current, mino.compose(board));
    }
  });

  return (
    <GameCanvas width={CANVAS_W} height={CANVAS_H} ref={canvasEl} />
  );
}

export default Game;
