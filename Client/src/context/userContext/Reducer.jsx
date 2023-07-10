const Reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                user: action.payload
            };
        case "LOGIN_FAILURE":
            return {
                ...state,
                user: null
            };
        case "LOGOUT":
            return {
                ...state,
                user: null
            };
        case "UPDATE_USERNAME":
            return {
                ...state,
                user: {
                    ...state.user,
                    username: action.payload
                }
            };
        default:
            return state;
    }
};

export default Reducer;

