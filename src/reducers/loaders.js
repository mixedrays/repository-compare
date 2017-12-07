import { START_LOADING, STOP_LOADING } from "../constants/actions";

export default (state = {}, action) => {
    switch (action.type) {
        case START_LOADING:
            return {
                isLoading: true
            };
        case STOP_LOADING:
            return {
                isLoading: false
            };
        default:
            return {
                isLoading: false
            };
    }
};
