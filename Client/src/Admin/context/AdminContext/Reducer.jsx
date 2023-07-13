const Reducer = (state, action) => {
    switch (action.type) {

        case "Users":
            return {
                ui: action.payload
            }
        case "Products":
            return {
                ui: action.payload
            }
        case "Mails":
            return {
                ui: action.payload
            }
        case "Reports":
            return {
                ui: action.payload
            }
        case "Dashboard":
            return {
                ui: action.payload
            }
        case "default":
            return {
                ui: action.payload
            }

        default:
            return state;
    }
}

export default Reducer;
