const todosById = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_TODOS_REQUEST_SUCCESS':
      const nextState = {...state};
      action.response.forEach(todo => {
        nextState[todo.id] = todo;
      })
      return nextState;
    default:
      return state;
  }
}

export default todosById;

export const getTodo = (state, id) => {
  return state[id]
};