export const ACTION_APP_REHYDRATION_COMPLETE = "ACTION_APP_REHYDRATION_COMPLETE";
export const ACTION_APP_LOADING_SHOW = "ACTION_APP_LOADING_SHOW";
export const ACTION_APP_LOADING_HIDE = "ACTION_APP_LOADING_HIDE";

export function setRehydrationComplete() {
    return {type: ACTION_APP_REHYDRATION_COMPLETE};
}

export function setLoadingOverlayVisible() {
    return {type: ACTION_APP_LOADING_SHOW}
}

export function setLoadingOverlayInvisible() {
    return {type: ACTION_APP_LOADING_HIDE}
}
