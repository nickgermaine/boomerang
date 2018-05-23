import api from '../../utils/api';
import {NotificationManager} from 'react-notifications';

export const ACTION_GOT_PROFILE = 'ACTION_GOT_PROFILE';
export const ACTION_POST_ADDED = 'ACTION_POST_ADDED';
export const ACTION_COMMENT_ADDED = 'ACTION_COMMENT_ADDED';
export const ACTION_COMMENT_DELETED = 'ACTION_COMMENT_DELETED';
export const ACTION_PROFILE_UPDATED = 'ACTION_PROFILE_UPDATED';

function gotProfile(profile){
    return {
        type: ACTION_GOT_PROFILE,
        payload: profile
    }
}

function postAdded(post){
    return {
        type: ACTION_POST_ADDED,
        payload: post
    }
}

function commentAdded(comment){
    return {
        type: ACTION_COMMENT_ADDED,
        payload: comment
    }
}

function profileUpdated(profile){
    return {
        type: ACTION_PROFILE_UPDATED,
        payload: profile
    }
}

function commentDeleted(id){
    return {
        type: ACTION_COMMENT_DELETED,
        payload: id
    }
}

export function getProfile(username, userId){
    return (dispatch) => {
        if(username){
            api.getProfile(username, null, res => {
                if(res.status === 200){
                    dispatch(gotProfile(res.data));
                }else{
                    NotificationManager.info('Either no profile exists here, it was temporarily removed, or you may be experiencing internet issues.', 'No Profile');
                }
            })
        }else{
            api.getProfile(null, userId, res => {
                if(res.status === 200){
                    dispatch(gotProfile(res.data[0]));
                }else{
                    NotificationManager.info('Either no profile exists here, it was temporarily removed, or you may be experiencing internet issues.', 'No Profile');
                }
            })
        }

    }
}

export function addPost(post){
    return (dispatch) => {
        api.addPost(post, res => {
            if(res.status === 200){
                dispatch(postAdded(res.data));
            }
        })
    }
}

export function addComment(comment){
    return (dispatch) => {
        api.addComment(comment, res => {
            dispatch(commentAdded(res.data));
        })
    }
}

export function deleteComment(id){
    return (dispatch) => {
        api.deleteComment(id, res => {
            dispatch(commentDeleted(id));
        })
    }
}

export function updateProfile(profile){
    return (dispatch) => {
        api.updateProfile(profile, res => {
            dispatch(profileUpdated(res.data));
        })
    }
}