import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

// index.js kicks off the whole app by providing a place for 
// the root component (App) to go.
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
