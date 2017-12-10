import * as React from "react";
import { connect } from "react-redux";
import { requestGitRepo } from "../../actions/requests";
import { showAlert } from "../../actions/alerts";
import * as style from "./style.css";

class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            repo: "",
            author: ""
        };
    }

    handleAuthorInputChange = e => {
        this.setState({
            author: e.target.value
        });
    };

    handleRepoInputChange = e => {
        this.setState({
            repo: e.target.value
        });
    };

    handleFormAction = e => {
        e.preventDefault();

        const repo = this.state.repo;
        const author = this.state.author;
        const addedRepos = this.props.repos.map(repo => repo.full_name);
        const repoFullName = `${author}/${repo}`;
        const isLoading = this.props.loaders.isLoading;

        if (isLoading || repo === "" || author === "") {
            return false;
        }

        this.setState({
            // author: "",
            repo: ""
        });

        if (addedRepos.indexOf(repoFullName) !== -1) {
            this.props.showAlert(
                "note",
                `${repoFullName} has been added already`
            );
            return false;
        }

        this.props.requestGitRepo(author, repo);
    };

    render() {
        const isLoading = this.props.loaders.isLoading;

        return (
            <form className={style.searchBar} onSubmit={this.handleFormAction}>
                <div className="form-row justify-content-center">
                    <div className="col-12 col-md-5 form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="inputAuthor"
                            placeholder="Author..."
                            onChange={this.handleAuthorInputChange}
                            value={this.state.author}
                        />
                    </div>
                    <div className="col-12 col-md-5 form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="inputRepo"
                            placeholder="Repository..."
                            onChange={this.handleRepoInputChange}
                            value={this.state.repo}
                        />
                    </div>
                    <div className="col-12 col-md-2 form-group">
                        <span className="input-group-btn">
                            <button
                                className={`btn btn-primary btn-block ${ isLoading ? "loading" : "" }`}
                                disabled={isLoading}
                            >
                                Add
                            </button>
                        </span>
                    </div>
                </div>
            </form>
        );
    }
}

const mapStateToProps = ({ loaders, repos }) => ({ loaders, repos });

export default connect(mapStateToProps, { requestGitRepo, showAlert })(
    SearchBar
);
