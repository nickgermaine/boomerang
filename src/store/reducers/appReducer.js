import * as AppActions from '../actions/appActions';


export const defaultState = {
    rehydrated: false,
    loading: false
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case AppActions.ACTION_APP_REHYDRATION_COMPLETE:
            return {
                ...state,
                rehydrated: true
            };
        case AppActions.ACTION_APP_LOADING_SHOW:
            return {
                ...state,
                loading: true
            };
        case AppActions.ACTION_APP_LOADING_HIDE:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
}
