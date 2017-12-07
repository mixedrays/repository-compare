import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { logger, promise } from "./middleware";
import Alerts from "./containers/Alerts";
import SearchBar from "./containers/SearchBar";
import RepoTable from "./containers/RepoTable";

const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);
const store = createStoreWithMiddleware(reducers);

// todo: fix hot reload
// if (module.hot) {
//     module.hot.accept('./reducers', () => {
//         const nextReducer = require('./reducers');
//         store.replaceReducer(nextReducer);
//     });
// }

ReactDOM.render(
    <Provider store={store}>
        <div>
            <Alerts />
            <div className="container-fluid">
                <SearchBar />
                <RepoTable />
            </div>
        </div>
    </Provider>,
    document.getElementById("root")
);
