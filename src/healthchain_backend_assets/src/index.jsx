import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import "../assets/main.scss";
import { applyMiddleware, createStore } from "redux";
import reducer from "./redux/reducers/combinedReducers";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthClient } from "@dfinity/auth-client";

const init = async () => {
    const authClient = await AuthClient.create();

    if (await authClient.isAuthenticated()) {
        handleAuthenticated(authClient);
    } else {
        await authClient.login({
            identityProvider: process.env.II_URL,
            onSuccess: () => {
                handleAuthenticated(authClient);
            },
        });
    }
};

const store = createStore(reducer, applyMiddleware(thunk));

const root = createRoot(document.getElementById('root'));

async function handleAuthenticated(authClient) {
    root.render(
        <Router>
            <Provider store={store}>
                <App/>,
            </Provider>
        </Router>
    );
}

init();