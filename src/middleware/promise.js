const isPromise = item => item && typeof item.then === "function";

export default function promiseMiddleware(store) {
    return next => action => {
        if (isPromise(action.payload)) {
            action.payload.then(payload => {
                store.dispatch(Object.assign({}, action, { payload }));
            });
        } else {
            return next(action);
        }
    };
}
