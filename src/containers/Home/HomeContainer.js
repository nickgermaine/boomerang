/* global FB */

import {connect} from 'react-redux';

import * as AuthActions from '../../store/actions/authActions';
import Home from '../../components/Home/Home';

const mapStateToProps = (state) => ({
    ...state.auth

});


const mapDispatchToProps = (dispatch) => ({

    authClear: () => {
        dispatch(AuthActions.clearErrors());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
