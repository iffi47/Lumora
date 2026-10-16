import { USER_ACTION_TYPES } from "./user.types";


const INITIAL_STATE = {
 currentUser: null,
 isLoading: false,
 error: null,
};
export const userReducer = (state=INITIAL_STATE, action) => {
 const { type, payload } = action;
 switch (type) {
  case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
   return {
    ...state,
    currentUser: payload,
    error: null,
   };
  case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
   return {
    ...state,
    currentUser: null,
    error: null,
   };
  case USER_ACTION_TYPES.CHECK_USER_SESSION:
   return {
    ...state,
   };
  case USER_ACTION_TYPES.SIGN_IN_FAILURE:
   return {
    ...state,
    error: payload,
   };
  case USER_ACTION_TYPES.GOOGLE_SIGN_IN_START:
   return {
    ...state,
   };
  case USER_ACTION_TYPES.EMAIL_SIGN_IN_START:
   return {
    ...state,
   };
  case USER_ACTION_TYPES.SIGN_UP_FAILED:
   return {
    ...state,
    error: payload,
   };
  case USER_ACTION_TYPES.SIGN_UP_START:
   return {
    ...state,
   };
  case USER_ACTION_TYPES.SIGN_UP_SUCCESS:
   return {
    ...state,
    user: payload,
   };
  default:
   return state;
 }
};

