/* global FB */

import {connect} from 'react-redux';

import * as AuthActions from '../../store/actions/authActions';
import * as ProfileActions from '../../store/actions/profileActions';
import * as MailActions from '../../store/actions/mailActions';
import OpenDrafts from '../../components/Mail/OpenDrafts';

const mapStateToProps = (state) => ({
    ...state.auth,
    ...state.profile,
    ...state.mail

});


const mapDispatchToProps = (dispatch) => ({
    getMailboxMessages: (box, user) => {
        dispatch(MailActions.getMessages(box, user));
    },
    getRelatedMessages: (index, references, user) => {
        dispatch(MailActions.getRelatedMessages(index, references, user))
    },
    markMessagesDone: (ids, user) => {
        dispatch(MailActions.markMessagesDone(ids, user));
    },
    cancelDraft: (index) => {
        dispatch(MailActions.cancelDraft(index));
    },
    sendMessage: (message, index, user) => {
        dispatch(MailActions.sendMessage(message, index, user));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OpenDrafts);
