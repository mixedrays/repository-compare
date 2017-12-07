import { SHOW_ALERT, HIDE_ALERT } from "../constants/actions";

export const hideAlert = id => {
    return dispatch => {
        dispatch({
            type: HIDE_ALERT,
            id
        });
    };
};

export const showAlert = (type, text) => {
    return dispatch => {
        dispatch({
            type: SHOW_ALERT,
            payload: { type, text }
        });
    };
};
