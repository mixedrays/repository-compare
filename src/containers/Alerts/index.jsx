import * as React from "react";
import { connect } from "react-redux";
import { hideAlert, showAlert } from "../../actions/alerts";
import * as style from "./style.css";

class Alerts extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.alerts.length === 0) {
            return null;
        }

        const alerts = this.props.alerts.map((alert, i) => {
            let type = "";
            switch (alert.type) {
                case "error":
                    type = "danger";
                    break;
                default:
                    type = "success";
            }

            return (
                <div
                    className={`alert alert-${type} ${style.alert}`}
                    role="alert"
                >
                    {alert.text}
                    <span
                        className={`float-right ${style.alertHide}`}
                        onClick={() => this.props.hideAlert(alert.id)}
                    >
                        Hide
                    </span>
                </div>
            );
        });

        return <div className={style.alertWrapper}>{alerts}</div>;
    }
}

const mapStateToProps = ({ alerts }) => ({ alerts });

export default connect(mapStateToProps, { hideAlert, showAlert })(Alerts);
