

import { createContext, useEffect, useReducer } from "react";
import Reducer from './Reducer';

//Initial User
const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem('user')) || null

}

//Create Context
export const Context = createContext(INITIAL_STATE);

//Provider component
export const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

    const updateUserName = (newName) => {
        dispatch({ type: 'UPDATE_USERNAME', payload: newName });
    };

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(state.user));
    }, [state.user]);

    return (
        <Context.Provider value={{ user: state.user, dispatch, updateUserName }}>
            {children}
        </Context.Provider>
    );
};
