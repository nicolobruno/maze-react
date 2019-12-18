import { stringArrayToObject } from './utils';

export const actions = stringArrayToObject([
  'MOVE',
  'RESET',
  'MOVE_DOWN',
  'MOVE_UP',
  'MOVE_LEFT',
  'MOVE_RIGHT'
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
  }
};
