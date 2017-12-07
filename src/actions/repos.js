import * as Actions from "../constants/actions";

export const addRepo = json => {
    return dispatch => {
        dispatch({
            type: Actions.ADD_REPO,
            payload: json
        });
    };
};

export const removeRepo = fullName => {
    return dispatch => {
        dispatch({
            type: Actions.REMOVE_REPO,
            payload: fullName
        });
    };
};
