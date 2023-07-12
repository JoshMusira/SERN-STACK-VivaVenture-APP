import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";
//initial state for user obj
const INITIAL_STATE = {
    ui: JSON.parse(localStorage.getItem("ui")) || 'default'
}
//declare createContext
export const ContextPhone = createContext(INITIAL_STATE);
//declare createContext
export const UIContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE)
    useEffect(() => {
        localStorage.setItem("ui", JSON.stringify(state.ui))
    }, [state.ui])
    return <ContextPhone.Provider value={{ ui: state.ui, dispatch }}>
        {children}
    </ContextPhone.Provider>
}