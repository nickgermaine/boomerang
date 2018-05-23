import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter, Switch} from 'react-router-dom';
import {PersistGate} from "redux-persist/lib/integration/react";

import './index.css?v=1.0';
import configureStore from './store';
import TopContainer from "./containers/TopContainer";

const {store, persistor} = configureStore();

ReactDOM.render((
    <Provider store={store}>
        <PersistGate
            store={store}
            persistor={persistor}
        >
            <BrowserRouter>
                <Switch>
                    <TopContainer />
                </Switch>
            </BrowserRouter>
        </PersistGate>
    </Provider>
), document.querySelector('#root'));