import { loginFailure, loginStart, loginSuccess,logoutStart, logoutSuccess, logoutFailure } from "./userRedux";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const logout = () => async (dispatch) => {
  dispatch(logoutStart());
  try {
    // Make an API call to log the user out
    
    dispatch(logoutSuccess());
  } catch (err) {
    dispatch(logoutFailure());
  }
};