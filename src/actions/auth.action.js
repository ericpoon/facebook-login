import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';

import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  FACEBOOK_LOGOUT,
} from './types';
import { FACEBOOK_APP_ID } from '../config';

export const facebookLogout = () => (
  async dispatch => {
    await AsyncStorage.setItem('fb_token', '');
    dispatch({ type: FACEBOOK_LOGOUT });
  }
);

export const facebookLogin = () => (
  async dispatch => {
    // await AsyncStorage.setItem('fb_token', 'invalid'); // for testing purpose

    const token = await AsyncStorage.getItem('fb_token');

    if (!token) {
      await loginViaFacebook(dispatch);
      return;
    }

    const { error, name } = await getFacebookInfo(token);

    if (!error) {
      onFacebookLoginSuccess(dispatch, token, name);
      return;
    }

    onFacebookLoginFail(dispatch, error);
    await loginViaFacebook(dispatch);
  }
);

const loginViaFacebook = async dispatch => {
  const { token, type } = await Facebook.logInWithReadPermissionsAsync(
    FACEBOOK_APP_ID,
    { permissions: ['public_profile'] },
  );

  if (type !== 'success') {
    onFacebookLoginFail(dispatch, type);
    return;
  }

  AsyncStorage.setItem('fb_token', token);
  const { error, name } = await getFacebookInfo(token);
  if (!error) {
    onFacebookLoginSuccess(dispatch, token, name);
    return;
  }

  onFacebookLoginFail(dispatch, type);

};

const getFacebookInfo = async (token) => {
  const userData = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
  const { error, name } = await userData.json();
  return { error: error ? error.message : null, name };
};

const onFacebookLoginSuccess = (dispatch, token, name) => {
  // storing the token in redux store makes it easier to access (synchronously) in the future
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, token, name });
};

const onFacebookLoginFail = (dispatch, error) => {
  dispatch({ type: FACEBOOK_LOGIN_FAIL, error });
};
