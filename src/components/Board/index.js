  import React, { useEffect, useState, useCallback } from 'react';
  import ArrowKeysReact from 'arrow-keys-react';
  import { useDispatch, useSelector } from 'react-redux'
  import { useAlert } from "react-alert";

  import { actions } from '../../redux/Board/actions';
  import Square from './components/Square';
  import { actionCreators } from '../../redux/Board/actions';
  import { RIGHT, LEFT, UP, DOWN, MESSAGE_SUCCESS } from './constants';
  import { canGoUp, canGoDown, canGoRight, canGoLeft, checkMove } from './utils';
  import './Board.css';

  function Board() {
    const dispatch = useDispatch();
    const alert = useAlert();

    const [ start, setStart ] = useState(false);
    const [ disableButtons, setDisableButtons ] = useState(false);

    const { board, position, finalized, indexRow, indexSquare, moves } = useSelector(state => state.board);
    
    useEffect(() => {
      if (start) {
        setTimeout(handleOnClick, 100);
      }
    });

    useEffect(() => {
      ArrowKeysReact.config({
        left: () => {
          canGoLeft(board, indexRow, indexSquare) && dispatch(actionCreators.move(LEFT));
        },
        right: () => {
          if(!finalized) {
            canGoRight(board, indexRow, indexSquare) && dispatch(actionCreators.move(RIGHT))
          } else {
            alert.success(`${MESSAGE_SUCCESS} ${moves} movimientos`);
            dispatch({ type: actions.RESET });
          }
        },
        up: () => {
          indexRow > 0 && canGoUp(board, indexRow, indexSquare) && dispatch(actionCreators.move(UP));
        },
        down: () => {
          canGoDown(board, indexRow, indexSquare) && dispatch(actionCreators.move(DOWN));
        }
      });
    });

    const handleOnClick = useCallback(() => {
      if(!finalized) {
        !start && setStart(true);
        setDisableButtons(true);
        checkMove(board, indexRow, indexSquare, position, dispatch);
      } else {
        setStart(false);
        dispatch(actionCreators.notifyMoves(moves))
        dispatch({ type: actions.RESET });
        setDisableButtons(false);
        alert.success(`${MESSAGE_SUCCESS} ${moves} movimientos`);
      }
    }, [finalized, start, dispatch, alert, board, indexRow, indexSquare, position, moves]);

    const handleOnReset = useCallback(() => {
      dispatch({ type: actions.RESET });
      setStart(false);
    }, [dispatch])

    return (
      <div className="board" {...ArrowKeysReact.events} tabIndex="1">
        <div className="container-button">
          <button className="help" onClick={handleOnClick} disabled={disableButtons}>Pídele ayuda a la aguilas</button>
          <button className="reset" onClick={handleOnReset} disabled={disableButtons}>Resetear</button>
        </div>
        {board && board.map((row, i) => (
          <div key={i} className="row">
            {row && row.map((square) =>
              <Square key={`${square.row}-${square.id}`} enabled={square.enabled} active={square.active} />
            )}
          </div>
        ))}
      </div>
    );
  }

  export default Board;
