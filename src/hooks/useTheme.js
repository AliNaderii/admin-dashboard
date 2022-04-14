import { useContext } from "react";
import { themeContext } from "../context/themeContext";

export const useTheme = () => {
  const state = useContext(themeContext);

  return state;
};