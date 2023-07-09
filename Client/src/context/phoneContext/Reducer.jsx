const Reducer = (state, action) => {
    switch (action.type) {

        case "Apple":
            return {
                ui: action.payload
            }
        case "Samsung":
            return {
                ui: action.payload
            }
        case "Oppo":
            return {
                ui: action.payload
            }
        case "Redmi":
            return {
                ui: action.payload
            }
        case "Nokia":
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
