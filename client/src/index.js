import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';
import { TransactionsProvider } from './context/TransactionContext';


// Render your app and connect to MetaMask
ReactDOM.render(
  <TransactionsProvider>
  <Provider store={store}>
    <App />
  </Provider>
  </TransactionsProvider>,
  document.getElementById('root')
);