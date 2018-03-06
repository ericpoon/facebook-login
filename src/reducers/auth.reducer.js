import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  FACEBOOK_LOGOUT,
} from '../actions/types';

const initialState = {
  name: '',
  token: '',
  error: '',
};

export default (state = initialState, action) => {
  console.log('auth reducer running', action);
  switch (action.type) {
    case FACEBOOK_LOGIN_SUCCESS:
      return { ...initialState, name: action.name, token: action.token };
    case FACEBOOK_LOGIN_FAIL:
      return { ...initialState, error: action.error };
    case FACEBOOK_LOGOUT:
      return initialState;
    default:
      return state;
  }
}
