export const updateBoard = (board, indexRow, indexGrid) => {
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
};
