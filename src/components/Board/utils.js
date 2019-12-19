import { RIGHT, LEFT, UP, DOWN } from './constants';

export const updateBoard = (board, indexRow, indexSquare) => {
  const boardUpdated = [
    ...board.slice(0, indexRow),
    [
      ...board[indexRow].slice(0, indexSquare),
      {
        active: false,
        enabled: true
      },
      ...board[indexRow].slice(indexSquare + 1 ),
    ],
    ...board.slice(indexRow + 1)
  ];
  return boardUpdated;
};

export const canGoRight = (board, x, y) => board[x][y + 1].enabled;

export const canGoLeft = (board, x, y) => board[x][y - 1].enabled;

export const canGoUp = (board, x, y) => x > 0 && board[x - 1][y].enabled;

export const canGoDown = (board, indexRow, indexSquare) => board[indexRow + 1][indexSquare].enabled;
