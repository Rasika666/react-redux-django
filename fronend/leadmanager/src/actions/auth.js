import axios from "axios";
import { returnErrors } from "./messages";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "./types";

//CHECK TOKEN AND LOAD USER
export const loadUser = () => (dispatch, getState) => {
  //user loading
  dispatch({
    type: USER_LOADING
  });

  axios
    .get("http://localhost:8000/api/auth/user", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

// Login user
export const login = (username, password) => dispatch => {
  //request header
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  //request body
  const body = JSON.stringify({
    username,
    password
  });

  axios
    .post("http://localhost:8000/api/auth/login", body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

// REGISTER USER
export const register = ({ username, password, email }) => dispatch => {
  //request header
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  //request body
  const body = JSON.stringify({
    username,
    password,
    email
  });

  axios
    .post("http://localhost:8000/api/auth/register", body, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

//LOGOUT USER
export const logout = () => (dispatch, getState) => {
  axios
    .post("http://localhost:8000/api/auth/logout/", null, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: LOGOUT_SUCCESS
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

//setup config with token - helper fuenction
export const tokenConfig = getState => {
  //Get token from state
  const token = getState().auth.token;

  //request header
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  //if token add to header config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
};
