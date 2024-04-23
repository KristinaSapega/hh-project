
import { createStore, applyMiddleware } from 'redux';

import { reducer } from './reducers/index';
import { StandsState } from './types';

export const initialState: StandsState = {
    stands: [],
  };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const asyncDispatchMiddleware = (store: any) => (next: any) => (action: any) => {
    let syncActivityFinished = false;
    let actionQueue: any[] = [];
  
    function flushQueue() {
      actionQueue.forEach(a => store.dispatch(a)); // flush queue
      actionQueue = [];
    }
  
    function asyncDispatch(asyncAction:any) {
      actionQueue = actionQueue.concat([asyncAction]);
  
      if (syncActivityFinished) {
        flushQueue();
      }
    }
  
    const actionWithAsyncDispatch =
      Object.assign({}, action, { asyncDispatch });
  
    const res = next(actionWithAsyncDispatch);
  
    syncActivityFinished = true;
    flushQueue();
  
    return res;
  };

const store = createStore(reducer, applyMiddleware(asyncDispatchMiddleware));


export default store;
