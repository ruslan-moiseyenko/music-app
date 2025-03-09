import React, { useReducer, useEffect, ReactNode } from "react";
import {
  AuthState,
  User,
  LoginCredentials,
  RegisterCredentials
} from "../types/user.types";
import authService from "../services/auth.service";
import { AuthContext } from "./AuthContext";

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null
};

type AuthAction =
  | { type: "LOGIN_SUCCESS"; payload: { user: User; token: string } }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "REGISTER_SUCCESS"; payload: { user: User; token: string } }
  | { type: "REGISTER_FAILURE"; payload: string }
  | { type: "LOGOUT" }
  | {
      type: "AUTH_LOADED";
      payload: { user: User | null; token: string | null };
    };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
        error: null
      };
    case "LOGIN_FAILURE":
    case "REGISTER_FAILURE":
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        token: null,
        error: action.payload
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        error: null
      };
    case "AUTH_LOADED":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: !!action.payload.user,
        user: action.payload.user,
        token: action.payload.token
      };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // auth check
  useEffect(() => {
    const loadUser = () => {
      const token = localStorage.getItem("token");
      if (token && authService.isAuthenticated()) {
        const user = authService.getCurrentUser();
        dispatch({ type: "AUTH_LOADED", payload: { user, token } });
      } else {
        localStorage.removeItem("token");
        dispatch({ type: "AUTH_LOADED", payload: { user: null, token: null } });
      }
    };

    loadUser();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const { user, token } = await authService.login(credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: { user, token } });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Login failed";
      dispatch({ type: "LOGIN_FAILURE", payload: errorMessage });
      throw error;
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      const { user, token } = await authService.register(credentials);
      dispatch({ type: "REGISTER_SUCCESS", payload: { user, token } });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Registration failed";
      dispatch({ type: "REGISTER_FAILURE", payload: errorMessage });
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        isLoading: state.isLoading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
