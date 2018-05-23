/* global FB */

import {connect} from 'react-redux';

import * as AuthActions from '../../store/actions/authActions';
import * as ProfileActions from '../../store/actions/profileActions';
import * as MailActions from '../../store/actions/mailActions';
import Mailbox from '../../components/Mail/Mailbox';

const mapStateToProps = (state) => ({
    ...state.auth,
    ...state.profile,
    ...state.mail

});


const mapDispatchToProps = (dispatch) => ({
    getMailboxMessages: (box, user) => {
        dispatch(MailActions.getMessages(box, user));
    },
    getRelatedMessages: (index, references, user, id, box) => {
        dispatch(MailActions.getRelatedMessages(index, references, user, id, box))
    },
    markMessagesDone: (ids, user) => {
        dispatch(MailActions.markMessagesDone(ids, user));
    },
    requestDraftOpen: (draft) => {
        dispatch(MailActions.requestDraftOpen(draft));
    },
    sendMessage: (message, index, user) => {
        dispatch(MailActions.sendMessage(message, index, user));
    },
    poll: (box, user, last) => {
        dispatch(MailActions.PollFolder(box, user, last));
    },
    getContacts: (user) => {
        dispatch(MailActions.getContacts(user));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Mailbox);
