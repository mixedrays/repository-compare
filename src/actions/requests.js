import * as Actions from "../constants/actions";
import { showAlert } from "./alerts";
import { startLoading, stopLoading } from "./loaders";
import { addRepo, removeRepo } from "./repos";

const GITHUB_API_URL = "https://api.github.com";

export function requestGitRepo(author, repo) {
    return dispatch => {
        const url = `${GITHUB_API_URL}/repos/${author}/${repo}`;

        dispatch(startLoading());

        fetch(url)
            .then(response => {
                return response.ok ? response.json() : Promise.reject(response);
            })
            .then(json => {
                dispatch(addRepo(json));
            })
            .catch(error => {
                const text = `Repo '${repo}' request is failed, status: ${ error.status } ${error.statusText}.`;

                dispatch(showAlert("error", text));
            })
            .then(() => {
                dispatch(stopLoading());
            });
    };
}
