// import { combineReducers } from 'redux';
import todos, * as fromTodos  from './todos';

// HACK: implement combineReducers from scratch
const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object
      .keys(reducers)
      .reduce(
        (nextState, key) => {
        nextState[key] = reducers[key](
          state[key], 
          action
        );
        return nextState;
      },
      {}
    )
  }
}

export default combineReducers({todos});

// export const getVisibleTodos = (state, filter) =>
//   fromTodos.getVisibleTodos(state.todos, filter);

// export const getIsFetching = (state, filter) =>
//   fromTodos.getIsFetching(state, filter)