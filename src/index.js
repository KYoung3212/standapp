import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import think from './middleware/think';
import reduxPromise from './middleware/redux_promise';
import types from './actions/types';

import { Provider } from 'react-redux';

const store = createStore(rootReducer, {}, applyMiddleware(think, reduxPromise));

if(localStorage.getItem('token')) {
    store.dispatch({ type: types.LOG_IN });
}

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('root')
);
