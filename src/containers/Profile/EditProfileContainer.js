/* global FB */

import {connect} from 'react-redux';

import * as AuthActions from '../../store/actions/authActions';
import * as ProfileActions from '../../store/actions/profileActions';
import ProfileEdit from '../../components/Profile/ProfileEdit';

const mapStateToProps = (state) => ({
    ...state.auth,
    ...state.profile

});


const mapDispatchToProps = (dispatch) => ({
    loadProfile: (username, userId) => {
        //dispatch(AuthActions.RegisterUser(data));
        dispatch(ProfileActions.getProfile(username, userId));
    },
    updateProfile: (profile) => {
        dispatch(ProfileActions.updateProfile(profile));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileEdit);
