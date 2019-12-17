import { stringArrayToObject } from './utils';

export const actions = stringArrayToObject(['MOVE']);

const privateActionCreators = {
  move(moveDirection, indexGrid, indexRow, board) {
    return {
      type: `${actions.MOVE}_${moveDirection}`,
      payload: { moveDirection, indexGrid, indexRow, board }
    };
  }
};

export const actionCreators = {
  move(moveDirection, indexGrid, indexRow, board) {
    return privateActionCreators.move(moveDirection, indexGrid, indexRow, board);
  }
};
