import { ADD_REPO, REMOVE_REPO } from "../constants/actions";

export default (state = [], action) => {
    const prevRepos = state ? state : [];
    switch (action.type) {
        case ADD_REPO:
            return [action.payload, ...prevRepos];
        case REMOVE_REPO:
            return state.filter(repo => repo.full_name !== action.payload);
        default:
            return state;
    }
};
