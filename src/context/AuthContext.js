//for login purpose
import { createContext, useEffect, useReducer } from "react"

//Create the initial state
const INITIAL_STATE = {
    //if there is a user then local storage gonna use it else null
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
};

//Create context 
export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                loading: true,
                error: null,
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                loading: false,
                error: null,
            };
        case "LOGIN_FAILURE":
            return {
                user: null,
                loading: false,
                error: action.payload,
            };
        case "LOGIN_FAILURE":
            return {
                user: null,
                loading: false,
                error: null,
            };
        default:
            return state
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    //On refresh the user should not be logged out
    //useEffect condition- whenever user changes update the local storage
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user))
    }, [state.user])

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                loading: state.loading,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};