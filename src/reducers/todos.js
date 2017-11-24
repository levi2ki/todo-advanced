import {combineReducers} from 'redux';
// import todo from './todo';
import todosById, * as fromTodosById from './todosById';
import createList, * as fromCreateList  from './createList';


// function name will be property name in store
const listByFilter = combineReducers({
  all: createList('all'),
  active: createList('active'),
  completed: createList('completed')
})

const todos = combineReducers({
  todosById,
  listByFilter
});
export default todos;

// not exactly reducer - this is SELECTOR
export const getVisibleTodos = (state, filter) => {
  const ids = fromCreateList.getIds(state.todos.listByFilter[filter]);
  return ids.map(id => fromTodosById.getTodo(state.todos.todosById, id));
}
export const getIsFetching = (state, filter) => {
  return fromCreateList.getIsFetching(state.todos.listByFilter[filter])
}
export const getErrorMessage = (state, filter) => {
  return fromCreateList.getErrorMessage(state.todos.listByFilter[filter])
}
