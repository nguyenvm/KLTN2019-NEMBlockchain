import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import appReducers from './reducers/index';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { NEMLibrary, NetworkTypes } from 'nem-library';

NEMLibrary.bootstrap(NetworkTypes.TEST_NET);

const rootElement = document.getElementById('root');

const store = createStore(
    appReducers,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__({ trace: true }),
    applyMiddleware(thunk)
)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , rootElement
);

registerServiceWorker();
