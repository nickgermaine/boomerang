/* global FB */

import {connect} from 'react-redux';

import * as AuthActions from '../../store/actions/authActions';
import Login from '../../components/Login/Login';

const mapStateToProps = (state) => ({
    ...state.auth

});


const mapDispatchToProps = (dispatch) => ({
    onRegister: (data) => {
        dispatch(AuthActions.RegisterUser(data));
    },
    onLogin: (data) => {
        dispatch(AuthActions.loginUser(data.email, data.password));
    },
    loginUserFailure: (error) => {
        dispatch(AuthActions.loginUserFailure(error));
    },
    authClear: () => {
        dispatch(AuthActions.clearErrors());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
