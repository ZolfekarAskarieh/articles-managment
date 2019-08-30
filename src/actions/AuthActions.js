/**
 * Auth Actions
 */
import { NotificationManager } from 'react-notifications';
import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGOUT_USER,
    SIGNUP_USER,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAILURE
} from '../actions/types';
import {signUpUser, signinUser, logoutUser} from '../services/auth';

/**
 * Redux Action To Sigin User
 */
export const signinUserAction = (user, history) => (dispatch) => {
    dispatch({ type: LOGIN_USER });

    const res = signinUser(user);
    if(res.success) {
        dispatch({ type: LOGIN_USER_SUCCESS, payload: res.payload });
        history.push('/dashboard');
        NotificationManager.success('User Login Successfully!');
    } else {
        dispatch({ type: LOGIN_USER_FAILURE });
        NotificationManager.error('Wrong Username/Password');
    }

}

/**
 * Redux Action To Signout User
 */
export const logoutUserAction = () => (dispatch) => {
    const res = logoutUser();
    if(res.success) {
        dispatch({ type: LOGOUT_USER });
        NotificationManager.success('User Logout Successfully');
    }
}

/**
 * Redux Action To Signup User
 */
export const signupUserAction = (user, history) => (dispatch) => {
    dispatch({ type: SIGNUP_USER });

    const res = signUpUser(user);

    if(res.success) {
        dispatch({ type: SIGNUP_USER_SUCCESS, payload: res.payload });
        history.push('/dashboard');
        NotificationManager.success('Account Created Successfully!');
    } else {
        dispatch({ type: SIGNUP_USER_FAILURE });
        NotificationManager.error("Email already exists");
    }

}