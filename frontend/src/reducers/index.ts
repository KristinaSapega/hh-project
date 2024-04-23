import { combineReducers } from 'redux';

import { standsReducer } from './standsReducer';

const reducer = combineReducers({
  stands: standsReducer
});

export { reducer };
