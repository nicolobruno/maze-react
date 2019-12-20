import { RIGHT, LEFT, UP, DOWN } from './constants';
import { actionCreators } from '../../redux/Board/actions';

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

export const checkMove = (board, indexRow, indexSquare, position, dispatch) => {
  switch (position) {
    case DOWN: {
      if (canGoDown(board, indexRow, indexSquare)) {
        dispatch(actionCreators.move(DOWN));
        return;
      } else if (canGoLeft(board, indexRow, indexSquare)) {
        dispatch(actionCreators.move(LEFT));
        return;
      } else if (canGoRight(board, indexRow, indexSquare)) {
        dispatch(actionCreators.move(RIGHT));
        return;
      }
      return;
    }
    case RIGHT: {
      if (canGoDown(board, indexRow, indexSquare)) {
        dispatch(actionCreators.move(DOWN));
        return;
      } else if (canGoRight(board, indexRow, indexSquare)) {
        dispatch(actionCreators.move(RIGHT));
        return;
      } else if (canGoUp(board, indexRow, indexSquare)){
        dispatch(actionCreators.move(UP));
        return;
      } else if (canGoLeft(board, indexRow, indexSquare)) {
        dispatch(actionCreators.move(LEFT));
        return;
      }
      return;
    }
    case UP: {
      if (canGoUp(board, indexRow, indexSquare)){
        dispatch(actionCreators.move(UP));
        return;
      }  else if (canGoRight(board, indexRow, indexSquare)) {
        dispatch(actionCreators.move(RIGHT));
        return;
      } else if (canGoLeft(board, indexRow, indexSquare)) {
        dispatch(actionCreators.move(LEFT));
        return;
      } else if (canGoDown(board, indexRow, indexSquare)) {
        dispatch(actionCreators.move(DOWN));
        return;
      }
      return;
    }
    case LEFT: {
      if (canGoLeft(board, indexRow, indexSquare) && !canGoUp(board, indexRow, indexSquare)) {
        dispatch(actionCreators.move(LEFT));
        return;
      } else if (canGoDown(board, indexRow, indexSquare)) {
        dispatch(actionCreators.move(DOWN));
        return;
      } else if (canGoUp(board, indexRow, indexSquare)){
        dispatch(actionCreators.move(UP));
      } else if (canGoRight(board, indexRow, indexSquare)) {
        dispatch(actionCreators.move(RIGHT));
        return;
      }
      return;
    }
    default: {
      return;
    }
  }
}
