import PropTypes from 'prop-types';
import Immutable from 'seamless-immutable';

import { matrix } from '../../constants';

const defaultState = {
  moves: 0,
  board: matrix,
  indexGrid: matrix[0].findIndex(elem => elem.active),
  indexRow: 0,
  lastIndexGrid: 0,
  lastIndexRow: 0
};

const resetPosition = ( board, indexGrid, indexRow ) => {
  const boardUpdated = [
    ...board.slice(0, indexRow),
    [
      ...board[indexRow].slice(0, indexGrid),
      {
        active: false,
        enabled: true
      },
      ...board[indexRow].slice(indexGrid + 1 ),
    ],
    ...board.slice(indexRow + 1)
  ];
  return boardUpdated;
}

export function reducer(state = Immutable(defaultState), action) {
  switch (action.type) {
    case 'MOVE_DOWN': {
      const indexGrid = state.indexGrid;
      const indexRow = state.indexRow;
      const resetBoard = resetPosition(state.board, indexGrid, indexRow);
      const boardUpdated = [
        ...resetBoard.slice(0, indexRow + 1),
        [
          ...resetBoard[indexRow + 1].slice(0, indexGrid),
          resetBoard[indexRow + 1][indexGrid].merge({active: true}),
          ...resetBoard[indexRow + 1].slice(indexGrid + 1 ),
        ],
        ...resetBoard.slice(indexRow + 2)
      ];
      return state.merge({
        moves: state.moves + 1,
        board: boardUpdated,
        lastIndexRow: indexRow,
        lastIndexGrid: indexGrid,
        indexRow: indexRow + 1,
        indexGrid: indexGrid
      });
    }
    case 'MOVE_RIGHT': {
      const indexGrid = state.indexGrid;
      const indexRow = state.indexRow;
      const resetBoard = resetPosition(state.board, indexGrid, indexRow);
      const boardUpdated = [
        ...resetBoard.slice(0, indexRow),
        [
          ...resetBoard[indexRow].slice(0, indexGrid + 1),
          resetBoard[indexRow][indexGrid + 1].merge({active: true}),
          ...resetBoard[indexRow].slice(indexGrid + 2),
        ],
        ...resetBoard.slice(indexRow + 1)
      ];
      return state.merge({
        moves: state.moves + 1,
        board: boardUpdated,
        indexGrid: indexGrid + 1,
        lastIndexGrid: indexGrid,
        lastIndexRow: indexRow,
        indexRow: indexRow
      });
    }
    case 'MOVE_UP': {
      const indexGrid = state.indexGrid;
      const indexRow = state.indexRow;
      const resetBoard = resetPosition(state.board, indexGrid, indexRow);
      const boardUpdated = [
        ...resetBoard.slice(0, indexRow - 1),
        [
          ...resetBoard[indexRow - 1].slice(0, indexGrid),
          resetBoard[indexRow - 1][indexGrid].merge({active: true}),

          ...resetBoard[indexRow - 1].slice(indexGrid + 1),
        ],
        ...resetBoard.slice(indexRow)
      ];
      return state.merge({
        moves: state.moves + 1,
        board: boardUpdated,
        indexRow: state.indexRow - 1,
        lastIndexRow: state.indexRow,
        indexGrid: indexGrid,
        lastIndexGrid: indexGrid
      });
    }
    case 'MOVE_LEFT': {
      const indexGrid = state.indexGrid;
      const indexRow = state.indexRow;
      const resetBoard = resetPosition(state.board, indexGrid, indexRow);
      const boardUpdated = [
        ...resetBoard.slice(0, indexRow),
        [
          ...resetBoard[indexRow].slice(0, indexGrid - 1),
          resetBoard[indexRow][indexGrid - 1].merge({active: true}),

          ...resetBoard[indexRow].slice(indexGrid),
        ],
        ...resetBoard.slice(indexRow + 1)
      ];
      return state.merge({
        moves: state.moves + 1,
        board: boardUpdated,
        indexRow: indexRow,
        lastIndexRow: indexRow,
        indexGrid: indexGrid - 1,
        lastIndexGrid: indexGrid
      });
    }
    default: {
      return state;
    }
  }
}

export function propTypes() {
  return {
    board: PropTypes.shape({
      message: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['info', 'error', 'success']).isRequired,
      title: PropTypes.string
    })
  };
}
