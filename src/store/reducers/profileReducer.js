import * as ProfileActions from '../actions/profileActions';

const defaultState = {
    profile: {}
}

export default (state = defaultState, action) => {
    switch(action.type){
        case ProfileActions.ACTION_GOT_PROFILE:
            return {
                ...state,
                profile: action.payload
            };
        case ProfileActions.ACTION_PROFILE_UPDATED:
            return {
                ...state,
                profile: action.payload
            };
        case ProfileActions.ACTION_POST_ADDED:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    user: {
                        ...state.profile.user,
                        Post: state.profile.user.Post.concat(action.payload)
                    }
                }
            };
        case ProfileActions.ACTION_COMMENT_ADDED:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    user: {
                        ...state.profile.user,
                        Post: state.profile.user.Post.map(post => {
                            if(post.id === action.payload.postId){
                                return {
                                    ...post,
                                    Comments: post.Comments.concat(action.payload)
                                }
                            }else{
                                return {
                                    ...post
                                }
                            }
                        })
                    }
                }
            };
        case ProfileActions.ACTION_COMMENT_DELETED:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    user: {
                        ...state.profile.user,
                        Post: state.profile.user.Post.map(post => {
                            return {
                                ...post,
                                Comments: post.Comments.filter(comment => {
                                    return comment.id !== action.payload;
                                })
                            }
                        })
                    }
                }
            }
        default:
            return {...state};
    }
}