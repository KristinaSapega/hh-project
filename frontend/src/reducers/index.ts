import { combineReducers } from 'redux';

import { pluginsReducer } from './pluginsReducer';
import { standsReducer } from './standsReducer';
import { tasksReducer } from './tasksReducer';

const reducer = combineReducers({
  stands: standsReducer,
  plugins: pluginsReducer,
  tasks: tasksReducer,
});

export { reducer };
