import {combineReducers} from "redux";
import app from './appReducer';
import auth from './authReducer';
import profile from './profileReducer';
import mail from './mailReducer';

const reducers = combineReducers({
    // test: combineReducers({
    //
    // }),
    app,
    auth,
    profile,
    mail
});

export default reducers;