import * as AppActions from "./appActions";
import api from '../../utils/api';
import moment from "moment/moment";

export const ACTION_AUTH_LOGIN_REQUEST = 'ACTION_AUTH_LOGIN_REQUEST';
export const ACTION_AUTH_LOGIN_SUCCESS = 'ACTION_AUTH_LOGIN_SUCCESS';
export const ACTION_AUTH_LOGIN_FAILURE = 'ACTION_AUTH_LOGIN_FAILURE';
export const ACTION_AUTH_LOGOUT = 'ACTION_AUTH_LOGOUT';

export const ACTION_AUTH_REGISTER_REQUEST = 'ACTION_AUTH_REGISTER_REQUEST';
export const ACTION_AUTH_REGISTER_SUCCESS = 'ACTION_AUTH_REGISTER_SUCCESS';
export const ACTION_AUTH_REGISTER_FAILURE = 'ACTION_AUTH_REGISTER_FAILURE';
export const ACTION_AUTH_PASSWORD_RESET_REQUESTED = 'ACTION_AUTH_PASSWORD_RESET_REQUESTED';
export const ACTION_AUTH_PASSWORD_RESET_COMPLETED = 'ACTION_AUTH_PASSWORD_RESET_COMPLETED';
export const ACTION_AUTH_RESET_PASSWORD_RESET_STATUS = 'ACTION_AUTH_RESET_PASSWORD_RESET_STATUS';
export const ACTION_AUTH_RESET_PASSWORD_FAILED = 'ACTION_AUTH_RESET_PASSWORD_FAILED';

export const ACTION_AUTH_CLEAR = 'ACTION_AUTH_CLEAR';
export const ACTION_UPDATED_PROFILE = 'ACTION_UPDATED_PROFILE';
export const ACTION_UPDATED_USER = 'ACTION_UPDATED_USER';
export const ACTION_GOT_ALL_COURSES = 'ACTION_GOT_ALL_COURSES';

/**
 * Validates username and password.
 *
 * @param username user name.
 * @param password user password.
 * @returns {boolean} true if right otherwise false.
 */
let userAccount;

function validateCredentials(username, password, callback) {

    console.log("Validating credentials", username, password);
    api.LoginUser({email: username, password: password}, (res) => {
        console.log("LI:", (res.status == 200), res);
        userAccount = res.data;
        callback(res);

    })
    //return (username === 'admin' && password === 'admin');
}

/**
 *
 */
function loginUserRequest() {
    return {type: ACTION_AUTH_LOGIN_REQUEST};
}

/**
 *
 * @param user authenticated user.
 */
function loginUserSuccess(user, messages) {

    return {
        type: ACTION_AUTH_LOGIN_SUCCESS,
        payload: {user, messages}
    };
}

function updatedUser(user) {
    return {
        type: ACTION_UPDATED_USER,
        payload: user
    }
}

export function updatedProfile(profile){
    console.log("profile updated", profile);
    return {
        type: ACTION_UPDATED_PROFILE,
        payload: profile
    }
}

function RegistrationSuccess(user) {
    return {
        type: ACTION_AUTH_REGISTER_SUCCESS,
        payload: {user}
    };
}

/**
 *
 * @param errorMessage description of error.
 */
export function loginUserFailure(errorMessage) {
    return {
        type: ACTION_AUTH_LOGIN_FAILURE,
        payload: {errorMessage}
    };
}

function passwordResetRequested(message){
    return {
        type: ACTION_AUTH_PASSWORD_RESET_REQUESTED,
        payload: {message}
    }
}

function passwordResetCompleted(message){
    return {
        type: ACTION_AUTH_PASSWORD_RESET_COMPLETED,
        payload: {message}
    }
}

export function resetPasswordResetStatus(){
    return {
        type: ACTION_AUTH_RESET_PASSWORD_RESET_STATUS
    };
}

function passwordResetFailed(passwordResetError){
    return {
        type: ACTION_AUTH_RESET_PASSWORD_FAILED,
        payload: {passwordResetError}
    }
}

export function clearErrors(){
    return {
        type: ACTION_AUTH_CLEAR,
        payload: {
            errorMessage: null,
            error: null,
            passwordResetError: null
        }
    }
}
/**
 * Try authenticate user with credential.
 *
 * @param username
 * @param password
 */
export function loginUser(username, password) {


    return (dispatch) => {
        api.getMessages(username, password, (res) => {
            console.log(res);
            dispatch(loginUserSuccess({username: username, password: password}, res.data))
        });
        dispatch(AppActions.setLoadingOverlayInvisible());



        /*

        validateCredentials(username, password, (res) => {
            if (res.status == 200) {
                let user = res.data;

                if(!user.courseList) {
                    user.courseList = [];
                }
                user.createdDate = moment(user.created).format("MMMM Do YYYY");
                console.log("Created", user.createdDate);

                dispatch(loginUserSuccess(user));

            } else {
                dispatch(loginUserFailure("Username or password is invalid."));
            }

            dispatch(AppActions.setLoadingOverlayInvisible());
        })
        */

    };
}


/***************************************
 * egister user
 */

export function RegisterUser(user) {


    return (dispatch) => {
        api.RegisterUser(user, (registered) => {
            console.log("REGISTERED", registered);

            if(registered.status == 200) {


                dispatch(loginUserRequest());
                dispatch(AppActions.setLoadingOverlayVisible());

                validateCredentials(user.email, user.password, (res) => {
                    if (res.status == 200) {
                        let user = res.data;

                        dispatch(loginUserSuccess(user));

                    } else {
                        dispatch(loginUserFailure(res.error.message));
                    }




                });
            }else{
                dispatch(loginUserFailure(registered.response.data.error.message));
            }

            dispatch(AppActions.setLoadingOverlayInvisible());
        });

    }

}

export function sendForgotPasswordEmail(email){
    return (dispatch) => {
        dispatch(AppActions.setLoadingOverlayVisible());
        api.resetPassword({email: email}, res => {
            console.log("password reset", res);
            if(res.data.email.status === 404){
                dispatch(passwordResetFailed(res.data.email.message));
            }else {
                dispatch(passwordResetRequested(res.data.email.message));
            }
        });
        dispatch(AppActions.setLoadingOverlayInvisible());
    }
}

export function resetPassword(token, password){
    return (dispatch) => {
        dispatch(AppActions.setLoadingOverlayVisible());
        api.resetPasswordWithToken({access_token: token, password: password}, res => {
            if(res.status === 200){
                dispatch(passwordResetCompleted(res));
            }
        })
        dispatch(AppActions.setLoadingOverlayInvisible());
    }

}

export function updateUser(token, user){
    return (dispatch) => {
        api.updateUser(token, user, res => {
            dispatch(updatedUser(res.data));
        })
    }
}

/**
 * Return action to logout user.
 */
export function logout() {
    return {type: ACTION_AUTH_LOGOUT};
}

function gotAllCourses(data){
    return {
        type: ACTION_GOT_ALL_COURSES,
        payload: data
    }
}
