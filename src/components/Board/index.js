  import React from 'react';
  import { useEffect, useState } from 'react';
  import ArrowKeysReact from 'arrow-keys-react';
  import { useDispatch, useSelector } from 'react-redux'
  import { useAlert } from "react-alert";

  import { actions } from '../../redux/Board/actions';
  import Square from './components/Square';
  import { actionCreators } from '../../redux/Board/actions';
  import { RIGHT, LEFT, UP, DOWN, MESSAGE_SUCCESS } from './constants';
  import './Board.css';

  function Board() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const [ start, setStart ] = useState(false);
    const [ disableButtons, setDisableButtons ] = useState(false);
    const board = useSelector(state => state.board.board);
    const finalized = useSelector(state => state.board.finalized);
    const indexRow = useSelector(state => state.board.indexRow);
    const indexSquare = useSelector(state => state.board.indexSquare);
    const position = useSelector(state => state.board.position);

    useEffect(() => {
      if (start) {
        setTimeout(handleOnClick, 150);
      }
    });

    useEffect(() => {
      ArrowKeysReact.config({
        left: () => {
          board[indexRow][indexSquare - 1].enabled && dispatch(actionCreators.move(LEFT));
        },
        right: () => {
          if(!finalized) {
            board[indexRow][indexSquare + 1].enabled && dispatch(actionCreators.move(RIGHT))
          } else {
            alert.success(MESSAGE_SUCCESS);
            dispatch({ type: actions.RESET });
          }
        },
        up: () => {
          board[indexRow - 1][indexSquare].enabled && dispatch(actionCreators.move(UP));
        },
        down: () => {
          board[indexRow + 1][indexSquare].enabled && dispatch(actionCreators.move(DOWN));
        }
      });
    });

    const handleOnClick = () => {
      if(!finalized) {
        if(!start) { setStart(true) }
        setDisableButtons(true);
        if (position === RIGHT && board[indexRow][indexSquare + 1].enabled) {
          dispatch(actionCreators.move(RIGHT));
          return;
        }
        if ((board[indexRow + 1][indexSquare].enabled) && (position !== UP)) {
          dispatch(actionCreators.move(DOWN));
          return;
        } else if (board[indexRow][indexSquare - 1].enabled && (position !== RIGHT || position === LEFT)) {
          dispatch(actionCreators.move(LEFT));
          return;
        } else if (board[indexRow][indexSquare + 1].enabled) {
          dispatch(actionCreators.move(RIGHT));
          return;
        }
        if (board[indexRow - 1] && board[indexRow - 1][indexSquare].enabled){
          dispatch(actionCreators.move(UP));
          return;
        } else if (board[indexRow][indexSquare - 1].enabled) {
          dispatch(actionCreators.move(LEFT));
          return;
        }
      } else {
        setStart(false);
        dispatch({ type: actions.RESET });
        setDisableButtons(false);
        alert.success(MESSAGE_SUCCESS);
      }
    };

    const handleOnReset = () => {
      dispatch({ type: actions.RESET });
      setStart(false);
    }

    return (
      <div className="board" {...ArrowKeysReact.events} tabIndex="1">
        <div className="container-button">
          <button className="help" onClick={handleOnClick} disabled={disableButtons}>Pídele ayuda a la aguilas</button>
          <button className="reset" onClick={handleOnReset} disabled={disableButtons}>Resetear</button>
        </div>
        {board && board.map((row, i) => (
          <div key={i} className="row">
            {row && row.map((square, i) =>
              <Square key={i} enabled={square.enabled} active={square.active} />
            )}
          </div>
        ))}
      </div>
    );
  }

  export default Board;
