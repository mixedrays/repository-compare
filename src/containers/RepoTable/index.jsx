import * as React from "react";
import { connect } from "react-redux";
import * as style from "./style.css";
import { getIndexesOfBest, normalizeName, isLink } from "../../helpers";
import { removeRepo } from "../../actions/repos";
import { requestGitRepo } from "../../actions/requests";

class RepoTable extends React.Component {
    constructor(props) {
        super(props);
    }

    handleRepoRemove(fullName) {
        this.props.removeRepo(fullName);
    }

    handlePopularClick = () => {
        // todo: check stop loading action
        this.props.requestGitRepo("facebook", "react");
        this.props.requestGitRepo("angular", "angular");
        this.props.requestGitRepo("vuejs", "vue");
        this.props.requestGitRepo("aurelia", "framework");
    };

    render() {
        const repos = this.props.repos;

        if (!repos.length) {

            // todo: move js frameworks compare link to separate component
            return (
                <div>
                    No repositories to compare...
                    You can try to <a href="#" onClick={this.handlePopularClick}>compare the most popular js frameworks.</a>
                </div>
            );
        }

        const defaulTRepoProps = [
            "description",
            "language",
            "created_at",
            "forks_count",
            "network_count",
            "stargazers_count",
            "subscribers_count",
            "watchers_count",
            "open_issues_count",
            "html_url"
            // 'clone_url'
        ];
        const reposHeadRow = repos.map((repo, i) => {
            return (
                <th key={i}>
                    {repo.full_name}
                    <span title="Remove repository"
                          className={style.repoRemove}
                          onClick={this.handleRepoRemove.bind(this, repo.full_name)}
                    >
                        &times;
                    </span>
                </th>
            );
        });
        const reposPropCells = prop => {
            const isMin = prop === "open_issues_count";
            const rowValues = repos.map(repo => repo[prop]);

            return repos.map((repo, i) => {
                const propValue = repo[prop];
                const tdClassName = repos.length > 1 && getIndexesOfBest(rowValues, isMin).indexOf(i) !== -1
                        ? style.cellBest
                        : "";
                const tdContent = isLink(propValue) ? <a href={propValue}>{propValue}</a> : <span>{propValue}</span>;

                return (
                    <td key={i} className={tdClassName}>
                        {tdContent}
                    </td>
                );
            });
        };
        const reposPropsRows = defaulTRepoProps.map((prop, i) => {
            return (
                <tr key={i}>
                    <td className={style.cellPropName}>
                        {normalizeName(prop)}
                    </td>
                    {reposPropCells(prop)}
                </tr>
            );
        });

        return (
            <div className="table-container">
                <table className={`table table-bordered table-hover ${ style.repoTable }`}>
                    <thead>
                        <tr>
                            <th>Stats/Name</th>
                            {reposHeadRow}
                        </tr>
                    </thead>

                    <tbody>{reposPropsRows}</tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = ({ repos }) => ({ repos });

export default connect(mapStateToProps, { removeRepo, requestGitRepo })(RepoTable);
