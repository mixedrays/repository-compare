import { SHOW_ALERT, HIDE_ALERT } from "../constants/actions";

export default (state = [], action) => {
    switch (action.type) {
        case SHOW_ALERT:
            return [
                {
                    id: Math.random(),
                    type: action.payload.type,
                    text: action.payload.text
                },
                ...state
            ];
        case HIDE_ALERT:
            return state.filter(alert => alert.id !== action.id);
        default:
            return state;
    }
};
