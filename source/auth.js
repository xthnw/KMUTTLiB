import React, { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();

const initialState = {
  authenticated: false,
  userData: null,
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

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

export { AuthProvider, useAuth };