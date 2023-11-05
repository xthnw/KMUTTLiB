import React, { createContext, useContext, useReducer } from 'react';

// Define the initial authentication state
const initialState = {
  authenticated: false,
  userData: null,
};

// Create the authentication context
const AuthContext = createContext(initialState);

// Create an authentication provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
// Create a custom hook for accessing the authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Reducer function to manage authentication state
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        authenticated: true,
        userData: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        authenticated: false,
        userData: null,
      };
    default:
      return state;
  }
};
