import { combineReducers } from "redux";
import alerts from "./alerts";
import repos from "./repos";
import loaders from "./loaders";

export default combineReducers({
    alerts,
    repos,
    loaders
});
