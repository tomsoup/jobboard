import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL
} from './types';


// AsyncStorage will return a promise
// AsyncStorage.setItem('fb_token', token);
// AsyncStorage.getItem('fb_token');

export const facebookLogin = () => {
  return async (dispatch) => {
    let token = await AsyncStorage.getItem('fb_token');
    if (token) {
      // Dispatch if token exist
      dispatch({
        type: FACEBOOK_LOGIN_SUCCESS, payload: token
      });
    } else {
      // start up FB login
      doFacebaookLogin(dispatch);
    }
  };
};

// async replace then
const doFacebaookLogin = async (dispatch) => {
  let { type, token } = await Facebook.logInWithReadPermissionsAsync('453878961619813', {
    permissions: ['public_profile']
  });
  if (type === 'cancel') {
    // dispatch is pass down from parent
    return dispatch({
      type: FACEBOOK_LOGIN_FAIL
    });
  }
  await AsyncStorage.setItem('fb_token', token);
  dispatch({
    type: FACEBOOK_LOGIN_SUCCESS, payload: token
  });
};
