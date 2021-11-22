import _ from 'lodash';
import {
  GET_SUPPORTS,
  GET_SUPPORT,
  ADD_SUPPORT,
  DELETE_SUPPORT,
  EDIT_SUPPORT
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_SUPPORTS:
      return {
        ...state,
        ..._.mapKeys(action.payload, 'id')
      };
    case GET_SUPPORT:
    case ADD_SUPPORT:
    case EDIT_SUPPORT:
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    case DELETE_SUPPORT:
      return _.omit(state, action.payload);
    default:
      return state;
  }
}