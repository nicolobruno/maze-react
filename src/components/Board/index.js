import React from 'react';
import { useEffect, useState } from 'react';
import ArrowKeysReact from 'arrow-keys-react';
import { useDispatch, useSelector } from 'react-redux'

import Grid from './components/Grid';
import { actionCreators } from '../../redux/Board/actions';
import './Board.css';

function Board() {
  const dispatch = useDispatch();
  const [ start, setStart ] = useState(false);
  const board = useSelector(state => state.board.board);
  const wind = useSelector(state => state.board.wind);
  const indexRow = useSelector(state => state.board.indexRow);
  const indexGrid = useSelector(state => state.board.indexGrid);
  const lastIndexRow = useSelector(state => state.board.lastIndexRow);
  const lastIndexGrid = useSelector(state => state.board.lastIndexGrid);

  useEffect(() => {
    if (start) {
      setTimeout(handleOnClick, 200);
    }
  });

  useEffect(() => {
    ArrowKeysReact.config({
      left: () => {
        board[indexRow][indexGrid - 1].enabled && dispatch(actionCreators.move('LEFT'));
      },
      right: () => {
        board[indexRow][indexGrid + 1].enabled && dispatch(actionCreators.move('RIGHT'));
      },
      up: () => {
        board[indexRow - 1][indexGrid].enabled && dispatch(actionCreators.move('UP'));
      },
      down: () => {
        board[indexRow + 1][indexGrid].enabled && dispatch(actionCreators.move('DOWN'));
      }
    });
  });

  const handleOnClick = () => {
    if(!wind) {
      if(!start) { setStart(true) }
      if(board[indexRow][indexGrid + 1].enabled && 
        ((board[indexRow - 1] && board[indexRow - 1][indexGrid].enabled) || board[indexRow + 1][indexGrid + 1].enabled || board[indexRow][indexGrid + 2].enabled )) {
        dispatch(actionCreators.move('RIGHT'));
        return;
      }
      if(indexRow !== 0 && lastIndexRow !== indexRow - 1) {
        if(board[indexRow - 1] && board[indexRow - 1][indexGrid].enabled){
          dispatch(actionCreators.move('UP'));
          return;
        }
      }
      if(board[indexRow + 1][indexGrid].enabled || indexRow === 0) {
        dispatch(actionCreators.move('DOWN'));
        return;
      }
      if(board[indexRow + 1][indexGrid - 1].enabled && board[indexRow] && board[indexRow][indexGrid - 1].enabled) {
        dispatch(actionCreators.move('LEFT'));
        return;
      }
    }
  };

  return (
    <div className="board" {...ArrowKeysReact.events} tabIndex="1">
      <button className="help" onClick={handleOnClick}>Pidele ayuda a la aguilas</button>
      {board && board.map((row, i) => (
        <div key={i} className="row">
          {row && row.map((grid, i) =>
            <Grid key={i} enabled={grid.enabled} active={grid.active} />
          )}
        </div>
      ))}
    </div>
  );
}

export default Board;
