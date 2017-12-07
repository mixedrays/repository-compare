import * as Actions from "../constants/actions";

export const startLoading = () => {
    return dispatch => {
        dispatch({
            type: Actions.START_LOADING
        });
    };
};

export const stopLoading = () => {
    return dispatch => {
        dispatch({
            type: Actions.STOP_LOADING
        });
    };
};
