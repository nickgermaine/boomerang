import {connect} from "react-redux";

import Top from "../components/Top";
import * as AuthActions from '../store/actions/authActions';

const mapStateToProps = (state) => ({
    ...state,

});

const mapDispatchToProps = (dispatch) => ({
    logout: () => {
        dispatch(AuthActions.logout())
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Top);