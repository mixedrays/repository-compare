export default function loggerMiddleware(store) {
    return next => action => {
        console.warn("Action called: ", action.type);
        return next(action);
    };
}
