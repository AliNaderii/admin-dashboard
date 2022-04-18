import { useContext } from "react";
import { authContext } from "../context/authContext";

export const useAuth = () => {
  const state = useContext(authContext);

  return state;
};