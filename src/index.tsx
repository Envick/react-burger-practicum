import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';

import { createStore,compose,applyMiddleware } from 'redux';
import {rootReducer}  from './services/reducers';
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import {
    WS_ORDERS_CONNECTION_CLOSED, WS_ORDERS_CONNECTION_ERROR,
    WS_ORDERS_CONNECTION_START,
    WS_ORDERS_CONNECTION_SUCCESS, WS_ORDERS_GET_MESSAGE,
    WS_ORDERS_SEND_MESSAGE
} from "./services/actions/profile-orders";
import {socketMiddleware} from "./services/middlewars/socket-middleware";
import {
    WS_FEED_CONNECTION_CLOSED, WS_FEED_CONNECTION_ERROR,
    WS_FEED_CONNECTION_START,
    WS_FEED_CONNECTION_SUCCESS, WS_FEED_GET_MESSAGE,
    WS_FEED_SEND_MESSAGE
} from "./services/actions/feed";

const composeEnhancers =
    //@ts-ignore
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        //@ts-ignore
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

export const wsOrdersActions = {
    wsInit: WS_ORDERS_CONNECTION_START,
    wsSendMessage: WS_ORDERS_SEND_MESSAGE,
    onOpen: WS_ORDERS_CONNECTION_SUCCESS,
    onClose: WS_ORDERS_CONNECTION_CLOSED,
    onError: WS_ORDERS_CONNECTION_ERROR,
    onMessage: WS_ORDERS_GET_MESSAGE
};

export const wsFeedActions = {
    wsInit: WS_FEED_CONNECTION_START,
    wsSendMessage: WS_FEED_SEND_MESSAGE,
    onOpen: WS_FEED_CONNECTION_SUCCESS,
    onClose: WS_FEED_CONNECTION_CLOSED,
    onError: WS_FEED_CONNECTION_ERROR,
    onMessage: WS_FEED_GET_MESSAGE
};

const enhancer = composeEnhancers(applyMiddleware(
    thunk,
    socketMiddleware('wss://norma.nomoreparties.space/orders/all', wsFeedActions),
    socketMiddleware('wss://norma.nomoreparties.space/orders', wsOrdersActions),
    )
);

export const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
