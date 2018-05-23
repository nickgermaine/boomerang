import {applyMiddleware} from "redux";
import ReduxThunk from 'redux-thunk';
import ReduxLogger from 'redux-logger';

let middleware = [ReduxThunk];

if (process.env.NODE_ENV === 'development') {
    middleware = [ReduxLogger, ...middleware];
}

export default applyMiddleware(...middleware);


