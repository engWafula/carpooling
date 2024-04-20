import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/store';
import { Provider } from 'react-redux';
import Web3 from 'web3'; // Import Web3 library

// Function to connect to MetaMask
async function connectToMetaMask() {
  // Modern dapp browsers...
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      // Accounts now exposed
    } catch (error) {
      console.error('User denied account access:', error);
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    // Use Mist/MetaMask's provider
    const web3 = new Web3(window.web3.currentProvider);
    // Accounts always exposed
  }
  // Non-dapp browsers...
  else {
    alert('Please install MetaMask to use this dApp');
  }
}

// Render your app and connect to MetaMask
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
  () => {
    // This function is called after rendering
    connectToMetaMask();
  }
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
