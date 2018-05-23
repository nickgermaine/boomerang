/* global FB */

import {connect} from 'react-redux';

import * as AuthActions from '../../store/actions/authActions';
import * as ProfileActions from '../../store/actions/profileActions';
import Profile from '../../components/Profile/Profile';

const mapStateToProps = (state) => ({
    ...state.auth,
    ...state.profile

});


const mapDispatchToProps = (dispatch) => ({
    loadProfile: (username, userId) => {
        //dispatch(AuthActions.RegisterUser(data));
        dispatch(ProfileActions.getProfile(username, userId));
    },
    addPost: (data) => {
        dispatch(ProfileActions.addPost(data));
    },
    addComment: (comment) => {
        dispatch(ProfileActions.addComment(comment));
    },
    deleteComment: (id) => {
        dispatch(ProfileActions.deleteComment(id));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);
