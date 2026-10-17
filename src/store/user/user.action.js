import { createAction } from "../../utlis/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";

export const setCurrentUser = (user) => {
  return createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
};

// SET_CURRENT_USER: "SET_CURRENT_USER",
//  CHECK_USER_SESSION: "CHECK_USER_SESSION",
//  GOOGLE_SIGN_IN_START: "GOOGLE_SIGN_IN_START",
//  EMAIL_SIGN_IN_START: "EMAIL_SIGN_IN_START",
//  SIGN_IN_SUCCESS: "SIGN_IN_SUCCESS",
//  SIGN_IN_FAILURE: "SIGN_IN_FAILURE",

export const checkUserSession = () =>
  createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);
export const googleSingInStart = () =>
  createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);
export const emailSigninStart = (email, password) =>
  createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password });
export const signOutStart = () =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_START);
export const signOutSuccess = () =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS);
export const signinSuccess = (user) =>
  createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);
export const signinFailure = (error) =>
  createAction(USER_ACTION_TYPES.SIGN_IN_FAILURE, error);
export const signUpStart = (email, password, displayName) =>
  createAction(USER_ACTION_TYPES.SIGN_UP_START, {
    email,
    password,
    displayName,
  });
export const signUpSuccess = (user, additionalDetails) =>
  createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user, additionalDetails });
export const signUpFailed = (error) =>
  createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error);
