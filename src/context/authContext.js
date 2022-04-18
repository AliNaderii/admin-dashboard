import { createContext, useEffect, useReducer } from "react";

export const authContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        user: action.payload
      };

    case 'LOGOUT':
      return {
        user: null
      };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  let [state, dispatch] = useReducer(authReducer, {
    user: JSON.parse(localStorage.getItem("user")) || null
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  console.log(state);

  return (
    <authContext.Provider value={ { ...state, dispatch } }>
      { children }
    </authContext.Provider>
  );
};