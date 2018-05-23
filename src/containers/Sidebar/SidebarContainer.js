import {connect} from "react-redux";

import Sidebar from "../../components/Sidebar/Sidebar";
import * as MailActions from '../../store/actions/mailActions';

const mapStateToProps = (state) => ({
    ...state,
    ...state.auth,
    ...state.mail

});

const mapDispatchToProps = (dispatch) => ({
    getFolders: (user) => {
        dispatch(MailActions.getFolders(user));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Sidebar);