import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { store } from './store/store';

const firebaseConfig = {
    apiKey: "AIzaSyB7Ii8aPVZ1ryiD2DnWTYfDFcknBp4PGN0",
    authDomain: "gallery-app-88687.firebaseapp.com",
    databaseURL: "https://gallery-app-88687-default-rtdb.firebaseio.com",
    projectId: "gallery-app-88687",
    storageBucket: "gallery-app-88687.appspot.com",
    messagingSenderId: "244283831074",
    appId: "1:244283831074:web:73d73ff3b1b0cf8323ab7b"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

