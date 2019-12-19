import { stringArrayToObject } from './utils';

import * as MoveService from '../../services/moves';

export const actions = stringArrayToObject([
  'MOVE',
  'RESET',
  'MOVE_DOWN',
  'MOVE_UP',
  'MOVE_LEFT',
  'MOVE_RIGHT',
  'NOTIFY_MOVES'
]);

const privateActionCreators = {
  move(moveDirection, indexSquare, indexRow, board) {
    return {
      type: `${actions.MOVE}_${moveDirection}`,
      payload: { moveDirection, indexSquare, indexRow, board }
    };
  }
};

export const actionCreators = {
  move(moveDirection, indexSquare, indexRow, board) {
    return privateActionCreators.move(moveDirection, indexSquare, indexRow, board);
  },
  notifyMoves(moves) {
    return async (dispatch) => {
      await MoveService.notifyMoves(moves);
      dispatch({ type: actions.NOTIFY_MOVES });
    };
  }
};
