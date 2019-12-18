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
