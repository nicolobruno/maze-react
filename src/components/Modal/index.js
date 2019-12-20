import React from 'react';
import { useState, useCallback } from 'react';

import './Modal.css';
import keyboard from './images/keyboard-arrow.png';

function Modal() {
  const [ visible, setVisible ] = useState(true);
    
  const closeModal = useCallback(
    () => {
      setVisible(!visible);
    },
    [visible],
  );

    return (
      visible && (
        <div className="modal-container">
          <h1 className="title">Al Rescate</h1>
          <h3 className="text">Gandalf se metió en problemas, se encuentra a unos pocos kilometros de Minas Morgul y Sauron lo tiene en la mira, no le queda mucho tiempo ! Ayúdalo !</h3>
          <div className="container-text">
            <h4 className="text">Haz click sobre el laberinto, guíalo hacia la salida.</h4>
            <img src={keyboard} className="icon-keyboard" />
          </div>
          <h4 className="text">O pídele ayuda a las aguilas, ellas vendran, lo sacaran y lo llevaran a un lugar seguro.</h4>
          <div className="container-button-close">
            <button className="button-close" onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )
    );
}

export default Modal;
