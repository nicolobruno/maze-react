import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'

import store from './redux/store';
import './index.css';
import App from './App'
import Modal from './components/Modal';
import * as serviceWorker from './serviceWorker';


const rootElement = document.getElementById('root')
ReactDOM.render(
  <Provider store={store}>
    <App />
    <Modal>holaaa</Modal>
  </Provider>,
  rootElement
)

serviceWorker.unregister();
