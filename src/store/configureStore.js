/* eslint-disable no-unused-vars */ 
import {
  createStore,
  applyMiddleware
} from 'redux';
import {createLogger} from 'redux-logger';
// import promise from 'redux-promise';
import ThunkMiddleware from 'redux-thunk';
import RootReducer from '../reducers';
// import {loadState, saveState} from './localStorage';


// HACK: redux-thunk own implementation
const thunk_own = (store) => (next) => (action) => {
  (typeof action === 'function') ?
    action(store.dispatch, store.getState) :
    next(action);
} 

// HACK: redux-promise implementation from scratch
const promise_own = (store) => (next) => (action) => {
  if (typeof action.then === 'function') {
    return action.then(next);
  }
  return next(action);
}


// HACK: redux-logger implementation from scratch
const logger_own = (store) => (next) => {
  if (!console.group) {
    return next;
  }
  return (action) => {
    console.group(action.type);
    console.log('%c prevState', 'color: gray', store.getState());
    console.log('%c action', 'color: blue', action);
    const returnValue = next(action);
    console.log('%c nextState', 'color: green', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  }
}

// HACK: applyMiddleware implementation from scratch
const wrapDispatchWithMiddlewares = (store, middlewares) => {
  middlewares.slice().reverse().forEach(middleware =>
    store.dispatch = middleware(store)(store.dispatch) //NOTE: thats why this was not working
  );
}


const configureStore = () => {
  const middlewares = [ThunkMiddleware , createLogger()];

  const store = createStore(RootReducer,
    // loadState(),
    applyMiddleware(...middlewares) // [promise, logger] ->
                                    // [logger(store) -> fn(next) --> fn(orig.dispatch),   promise(store) -> fn(next) --> fn(logger)] ->  
                                    // action >>---> promise(store)(logger(store)(orig.dispatch(action))(action))(action)
                                    // last function has orig.dispatch signature
  );
  // wrapDispatchWithMiddlewares(store, middlewares);
  // store.subscribe(() => {
  //   saveState({
  //     todos: store.getState().todos
  //   })
  // });
  return store;
}

export default configureStore;
/* eslint-enable no-unused-vars */ 
