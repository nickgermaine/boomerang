import * as AuthActions from '../actions/authActions';
import {NotificationManager} from 'react-notifications';

const defaultState = {
    authorized: false,
    user: null,
    profile: null,
    errorMessage: null,
    message: null,
    passwordResetError: null,
    passwordResetCompleted: false,
    allCourses: [],
    messages: []
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case AuthActions.ACTION_AUTH_LOGIN_SUCCESS:
            return {
                ...state,
                authorized: true,
                errorMessage: null,
                ...action.payload,
                passwordResetCompleted: false
            };
        case AuthActions.ACTION_UPDATED_USER:
            console.log("Updating user to", action.payload);
            return {
                ...state,
                user: {...state.user, user: action.payload}
            };
        case AuthActions.ACTION_UPDATED_PROFILE:
            NotificationManager.success('Your profile information has been saved.', 'Saved');
            return {
                ...state,
                profile: action.payload
            };
        case AuthActions.ACTION_AUTH_LOGOUT:
            return {
                ...state,
                authorized: false
            };
        case AuthActions.ACTION_AUTH_LOGIN_FAILURE:
            return {
                ...state,
                authorized: false,
                ...action.payload
            };
        case AuthActions.ACTION_AUTH_REGISTER_SUCCESS:
            return {
                ...state,
                authorized: true,
                ...action.payload,
                passwordResetCompleted: false
            };
        case AuthActions.ACTION_AUTH_PASSWORD_RESET_REQUESTED:
            return {
                ...state,
                ...action.payload
            };
        case AuthActions.ACTION_AUTH_RESET_PASSWORD_FAILED:
            return {
                ...state,
                ...action.payload
            };
        case AuthActions.ACTION_AUTH_PASSWORD_RESET_COMPLETED:
            return {
                ...state,
                ...state.payload,
                passwordResetCompleted: true
            };
        case AuthActions.ACTION_AUTH_CLEAR:
            return defaultState;
        case AuthActions.ACTION_AUTH_RESET_PASSWORD_RESET_STATUS:
            return {
                ...state,
                message: null,
                passwordResetCompleted: false
            };
        case AuthActions.ACTION_GOT_ALL_COURSES:
            return {
                ...state,
                allCourses: action.payload
            };
        default:
            return state;
    }
}