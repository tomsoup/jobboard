import _ from 'loadash';
import {
  LIKE_JOB
} from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case LIKE_JOB:
      return _.uniqBy([
        actions.payload, ...state
      ], 'jobkey');
    default:
      return state;
  }
};
