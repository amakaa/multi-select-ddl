import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './containers/app/App';
import { createStore } from 'redux';
import departments from './redux/modules/departments.js';

const store = createStore(departments);

ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'));
