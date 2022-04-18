import { createContext, useReducer } from "react";

export const themeContext = createContext();

const themeReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_THEME':
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      return { ...state, theme: newTheme };
    default:
      return state;
  }
};

export const ThemeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, {
    theme: 'light'
  });

  return (
    <themeContext.Provider value={ { ...state, dispatch } }>
      { children }
    </themeContext.Provider>
  );
};

