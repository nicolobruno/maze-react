import React from 'react';

import './App.css';
import Board from './components/Board';
import Head from './components/Head';
import { matrix } from './constants';

function App() {
  return (
    <div className="App">
      <Head />
      <Board matrix={matrix} />
    </div>
  );
}

export default App;
