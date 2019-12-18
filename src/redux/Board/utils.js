import Immutable from 'seamless-immutable';

export function stringArrayToObject(actionsArray, namespace = '') {
  if (actionsArray.some(actionName => !actionName || typeof actionName !== 'string')) {
    throw new Error('Action names must be strings and must not be empty');
  }
  const prefix = namespace ? `${namespace}:` : '';
  return Immutable(actionsArray).asObject(actionName => [actionName, `${prefix}${actionName}`]);
}

export const resetPosition = ( board, indexSquare, indexRow ) => {
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
}

export const checkFinalized = (board, indexRow, indexSquare) => board[indexRow][indexSquare + 2] === undefined;
