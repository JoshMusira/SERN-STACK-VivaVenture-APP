import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

// const storedData = localStorage.getItem("ui");
// const parsedData = storedData ? JSON.parse(storedData) : 'Dashboard';

// const INITIAL_STATE = {
//     ui: parsedData
// };

// initial state for user obj
const INITIAL_STATE = {
    ui: JSON.parse(localStorage.getItem("ui")) || 'Dashboard'
}
//declare createContext
export const Context = createContext(INITIAL_STATE);
//declare createContext
export const AdminContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE)
    useEffect(() => {
        localStorage.setItem("ui", JSON.stringify(state.ui))
    }, [state.ui])
    return <Context.Provider value={{ ui: state.ui, dispatch }}>
        {children}
    </Context.Provider>
}