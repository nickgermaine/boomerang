import * as AuthActions from '../actions/authActions';
import * as MailActions from '../actions/mailActions';
import {NotificationManager} from 'react-notifications';
import moment from 'moment';

const defaultState = {
    folders: [],
    messages: [],
    loadingIndexes: [],
    openDrafts: [],
    lastMessageCount: 0,
    contacts: []
};


function sortMessagesByDate(messages){
    return messages.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(a.headers.Date) - new Date(b.headers.Date);
    });
}

function sortThreadsByDate(threads){
    return threads.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(a.messages[a.messages.length - 1].headers.Date) < new Date(b.messages[b.messages.length - 1].headers.Date);
    });
}

export default (state = defaultState, action) => {
    switch(action.type){
        case MailActions.FOLDERS_RECEIVED:
            return {
                ...state,
                folders: action.payload
            };
        case MailActions.UPDATE_COUNT:
            return {
                ...state,
                lastMessageCount: action.payload
            };
        case MailActions.REQUEST_DRAFT_OPEN:
            return {
                ...state,
                openDrafts: state.openDrafts.concat(action.payload)
            };

        case MailActions.DRAFT_CANCELLED:
            return {
                ...state,
                openDrafts: state.openDrafts.filter((d, i) => i !== action.payload)
            };
        case MailActions.RELATED_MESSAGES_REQUESTED:
            return {
                ...state,
                loadingIndexes: state.loadingIndexes.concat(action.payload)
            };
        case MailActions.MESSAGE_SENT:
            return {
                ...state,
                openDrafts: state.openDrafts.filter((d, i) => i !== action.payload)
            };

        case MailActions.CONTACTS_RETRIEVED:
            return {
                ...state,
                contacts: action.payload
            };
        case MailActions.MESSAGES_RECEIVED:

            action.payload = sortThreadsByDate(action.payload.filter(thread => thread.messages.length > 0));


            let today = action.payload.filter(thread => {
                if(thread.messages.length > 0) {
                    return moment(new Date()).diff(moment(thread.messages[thread.messages.length - 1].headers.Date), 'days') < 0
                }
            });

            let yesterday = action.payload.filter(thread => {
                if(thread.messages.length > 0) {
                    return moment(new Date()).diff(moment(thread.messages[thread.messages.length - 1].headers.Date), 'days') == 1
                }
            });

            let older = action.payload.filter(thread => {
                if(thread.messages.length > 0) {
                    return moment(new Date()).diff(moment(thread.messages[thread.messages.length - 1].headers.Date), 'days') > 1
                }
            });


            if(today.length > 0){
                action.payload.unshift({type: 'header', label: 'Today'});
            }
            let todayLastIndex = (action.payload.indexOf(today[today.length - 1]) > -1) ? action.payload.indexOf(today[today.length - 1]) + 1 : 0;

            console.log("today", todayLastIndex);


            if(yesterday.length > 0){
                action.payload.splice(todayLastIndex, 0, {type: 'header', label: 'Yesterday'});
            }

            let yesterdayLastIndex = (action.payload.indexOf(yesterday[yesterday.length - 1]) > -1) ? action.payload.indexOf(yesterday[yesterday.length - 1]) + 1 : 0;

            console.log("yesterdayLastIndex", yesterdayLastIndex);

            if(older.length > 0){
                action.payload.splice(yesterdayLastIndex, 0, {type: 'header', label: 'Older'});
            }

            return {
                ...state,
                messages: action.payload
            };

        case MailActions.MESSAGES_UPDATED:

            return {
                ...state,
                messages: state.messages.map(msg => {
                    if(msg.messages) {

                        return {
                            ...msg,
                            messages: msg.messages.filter(m => action.payload.indexOf(m.headers['Message-ID']) == -1)
                        }
                    }else{
                        return {
                            ...msg
                        }
                    }
                })
            }
        case MailActions.RELATED_MESSAGES_RECEIVED:

            let existingIds = state.messages[action.payload.index].messages.map(m => m.headers['Message-ID']);
            let messages = action.payload.messages.filter(msg => existingIds.indexOf(msg.headers['Message-ID']) === -1);

            return {
                ...state,
                loadingIndexes: state.loadingIndexes.filter(li => li !== action.payload.index),
                messages: state.messages.map((msg, i) => {
                    if(i === action.payload.index){
                        return {
                            ...msg,
                            messages: sortMessagesByDate(msg.messages.concat(messages)).map(message => {
                                return {
                                    ...message,
                                    flags: ['\\Seen']
                                }
                            })
                        }
                    }else{
                        return {
                            ...msg
                        }
                    }
                })
            }
        default:
            return {
                ...state
            }
    }
}