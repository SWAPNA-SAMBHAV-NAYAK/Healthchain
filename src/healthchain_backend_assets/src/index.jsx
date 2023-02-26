import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import "../assets/main.scss";
import { applyMiddleware, createStore } from "redux";
import reducer from "./redux/reducers/combinedReducers";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true,
        traceLimit: 25
    })) || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

const root = createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
);