import React from 'react';
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import './App.css';
import Board from './components/Board';
import Head from './components/Head';

const options = {
  timeout: 5000,
  position: positions.TOP_CENTER,
  containerStyle: { width: 400, height: 300 }
};

function App() {
  return (
    <div className="App">
      <Provider template={AlertTemplate} {...options}>
        <Head />
        <Board />
      </Provider>
    </div>
  );
}

export default App;
