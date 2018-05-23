import * as AppActions from "./appActions";
import api from '../../utils/api';
import moment from "moment/moment";

export const FOLDERS_RECEIVED = 'FOLDERS_RECEIVED';
export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED';
export const RELATED_MESSAGES_RECEIVED = 'RELATED_MESSAGES_RECEIVED';
export const MESSAGES_UPDATED = 'MESSAGES_UPDATED';
export const RELATED_MESSAGES_REQUESTED = 'RELATED_MESSAGES_REQUESTED';
export const MESSAGES_REQUESTED = 'MESSAGES_REQUESTED';
export const REQUEST_DRAFT_OPEN = 'REQUEST_DRAFT_OPEN';
export const DRAFT_CANCELLED = 'DRAFT_CANCELLED';
export const MESSAGE_SENT = 'MESSAGE_SENT';
export const UPDATE_COUNT = 'UPDATE_COUNT';

export const CONTACTS_RETRIEVED = 'CONTACTS_RETRIEVED';

export function gotMessages(messages){
    return {
        type: MESSAGES_RECEIVED,
        payload: messages
    }
}

function setLastMessageCount(count){
    return {
        type: UPDATE_COUNT,
        payload: count
    }
}

export function requestDraftOpen(draft){
    return {
        type: REQUEST_DRAFT_OPEN,
        payload: draft
    }
}

export function cancelDraft(index){
    return {
        type: DRAFT_CANCELLED,
        payload: index
    }
}

function messageSent(index){
    return {
        type: MESSAGE_SENT,
        payload: index
    }
}

function messagesRequested(){
    return {
        type: MESSAGES_REQUESTED
    }
}

export function markedDone(ids){
    return {
        type: MESSAGES_UPDATED,
        payload: ids
    }
}

function relatedMessagesRequested(index){
    return {
        type: RELATED_MESSAGES_REQUESTED,
        payload: index
    }
}

export function gotRelatedMessages(index, messages){
    return {
        type: RELATED_MESSAGES_RECEIVED,
        payload: {index, messages}
    }
}

export function gotFolders(folders){
    return {
        type: FOLDERS_RECEIVED,
        payload: folders
    }
}

export function getMessages(box, user){
    return (dispatch) => {
        api.getMailboxMessages(box, user, res => {
            dispatch(gotMessages(res.data));
        })
    }
}

export function getFolders(user){
    return (dispatch) => {
        api.getFolders(user, res => {
            dispatch(gotFolders(res.data));
        })
    }
}

export function getRelatedMessages(index, references, user, id, box){
    return (dispatch) => {
        dispatch(relatedMessagesRequested(index));
        api.getRelatedMessages(references, user, id, box, res => {
            dispatch(gotRelatedMessages(index, res.data));
        })
    }
}

export function markMessagesDone(ids, user){
    return (dispatch) => {
        api.markMessagesDone(ids, user, res => {
            dispatch(markedDone(ids));
        })
    }
}

export function sendMessage(message, index, user){
    return (dispatch) => {
        api.sendMessage(message, user, res => {
            dispatch(messageSent(index));
        })

    }
}

export function PollFolder(box, user, last){
    return (dispatch) => {
        api.pollFolder(box, user, res => {
            if(res.data.count != last){
                dispatch(setLastMessageCount(res.data.count));
                dispatch(getMessages(box, user));
            }
        })
    }
}

function gotContacts(contacts){
    return {
        type: CONTACTS_RETRIEVED,
        payload: contacts
    }
}

export function getContacts(user){
    return (dispatch) => {
        api.getContacts(user, res => {
            dispatch(gotContacts(res.data));
        })
    }
}