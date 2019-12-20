import Immutable from 'seamless-immutable';

import { actions } from './actions';
import { matrix } from '../../constants';
import { resetPosition, checkFinalized } from './utils';
import { UP, DOWN, LEFT, RIGHT } from '../../components/Board/constants';

const defaultState = {
  moves: 0,
  board: matrix,
  indexSquare: matrix[0].findIndex(elem => elem.active),
  indexRow: 0,
  finalized: false,
  position: DOWN
};

export function reducer(state = Immutable(defaultState), action) {
  switch (action.type) {
    case actions.MOVE_DOWN: {
      const { indexSquare, indexRow, board } = state;
      const resetBoard = resetPosition(board, indexSquare, indexRow);
      const boardUpdated = [
        ...resetBoard.slice(0, indexRow + 1),
        [
          ...resetBoard[indexRow + 1].slice(0, indexSquare),
          resetBoard[indexRow + 1][indexSquare].merge({active: true}),
          ...resetBoard[indexRow + 1].slice(indexSquare + 1 ),
        ],
        ...resetBoard.slice(indexRow + 2)
      ];
      debugger
      return state.merge({
        moves: state.moves + 1,
        board: boardUpdated,
        indexRow: indexRow + 1,
        indexSquare: indexSquare,
        position: DOWN
      });
    }
    case actions.MOVE_RIGHT: {
      const { indexSquare, indexRow, board } = state;
      const resetBoard = resetPosition(board, indexSquare, indexRow);
      const boardUpdated = [
        ...resetBoard.slice(0, indexRow),
        [
          ...resetBoard[indexRow].slice(0, indexSquare + 1),
          resetBoard[indexRow][indexSquare + 1].merge({active: true}),
          ...resetBoard[indexRow].slice(indexSquare + 2),
        ],
        ...resetBoard.slice(indexRow + 1)
      ];
      return state.merge({
        moves: state.moves + 1,
        board: boardUpdated,
        indexSquare: indexSquare + 1,
        indexRow: indexRow,
        position: RIGHT,
        finalized: checkFinalized(board, indexRow, indexSquare + 1)
      });
    }
    case actions.MOVE_UP: {
      const { indexSquare, indexRow, board } = state;
      const resetBoard = resetPosition(board, indexSquare, indexRow);
      const boardUpdated = [
        ...resetBoard.slice(0, indexRow - 1),
        [
          ...resetBoard[indexRow - 1].slice(0, indexSquare),
          resetBoard[indexRow - 1][indexSquare].merge({active: true}),

          ...resetBoard[indexRow - 1].slice(indexSquare + 1),
        ],
        ...resetBoard.slice(indexRow)
      ];
      return state.merge({
        moves: state.moves + 1,
        board: boardUpdated,
        indexRow: state.indexRow - 1,
        indexSquare: indexSquare,
        position: UP
      });
    }
    case actions.MOVE_LEFT: {
      const { indexSquare, indexRow, board } = state;
      const resetBoard = resetPosition(board, indexSquare, indexRow);
      const boardUpdated = [
        ...resetBoard.slice(0, indexRow),
        [
          ...resetBoard[indexRow].slice(0, indexSquare - 1),
          resetBoard[indexRow][indexSquare - 1].merge({active: true}),

          ...resetBoard[indexRow].slice(indexSquare),
        ],
        ...resetBoard.slice(indexRow + 1)
      ];
      return state.merge({
        moves: state.moves + 1,
        board: boardUpdated,
        indexRow: indexRow,
        indexSquare: indexSquare - 1,
        position: LEFT,
        finalized: checkFinalized(board, indexRow, indexSquare)
      });
    }
    case actions.RESET: {
      return state.merge({
        moves: 0,
        indexSquare: matrix[0].findIndex(elem => elem.active),
        indexRow: 0,
        board: matrix,
        finalized: false
      })
    }
    default: {
      return state; 
    }
  }
}
