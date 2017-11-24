import v4 from 'uuid';
import {
  ADD_TODO,
  TOGGLE_TODO
} from '../constants/actionTypes';
import {getIsFetching} from '../reducers/todos'
import * as api from '../store/api';

// NOTE: async action creators usually must return synchronous actions
export const fetchTodos = (filter) => (dispatch, getState) => {  
  if (getIsFetching(getState(), filter)) {
    return Promise.resolve();
  }

  dispatch({
    type: 'FETCH_TODOS_REQUEST',
    filter,
  });  

  return api.fetchTodos(filter).then(
    response =>
      dispatch({
        type: 'FETCH_TODOS_REQUEST_SUCCESS',
        filter,
        response,
      })
    )
    .catch(err =>
      dispatch({
        type: 'FETCH_TODOS_REQUEST_FAILURE',
        filter,
        message: err.message || 'aw :('
      })
    );
};


export const addTodo = (text) => ({
  type: ADD_TODO,
  id: v4(),
  completed: false,
  text
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  id
});