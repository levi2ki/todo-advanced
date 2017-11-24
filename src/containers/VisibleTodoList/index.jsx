import React from 'react';
import Todo from '../../components/Todo';
import FetchError from '../../components/FetchError';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
import * as actions from '../../actions/todo';
import {getVisibleTodos, getIsFetching, getErrorMessage} from '../../reducers/todos'

class VisibleTodoList extends React.Component {
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(prevProps) {
    if(this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const {filter, fetchTodos} = this.props;
    fetchTodos(filter)
  }

  render() {
    if (this.props.isFetching && !this.props.todos.length) {
      return (
        <p>Loading...</p>
      )
    }
    if (this.props.errorMessage && !this.props.todos.length) {
      return (
        <FetchError
         message={this.props.errorMessage} 
         onRetry={() => this.fetchData()}
        />
      )
    }
    return (
      <ul>
        {
            this.props.todos.map( todo => (
              <Todo 
                key={todo.id}
                {...todo} 
                onClick={ () => {
                  this.props.toggleTodo(todo.id)
                }}
              />
            ))
          }
      </ul>
    )
  }
}

const mapStateToProps = (state, {match}) => {
  const filter = match.params.filter || 'all';
  return {
    todos: getVisibleTodos(state, filter),
    errorMessage: getErrorMessage(state, filter),
    isFetching: getIsFetching(state, filter),
    filter
  }
}

// const mapDispatchToProps =  dispatch => bindActionCreators({toggleTodo}, dispatch);
// NOTE: mapDispatchToProps shortland - use this if all argument names and function names is identical
export default withRouter(connect(
  mapStateToProps, 
  actions
)(VisibleTodoList));