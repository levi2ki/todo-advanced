/* eslint-disable no-unused-vars */
import expect from 'expect';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import VisibleTodoList from './containers/VisibleTodoList';
import Footer from './components/Footer'

import {addTodo} from './actions/todo'
import configureStore from './store/configureStore';

const store = configureStore();


class TodoApp extends React.Component {
  render() {
    return (
      <div>
        <input type="text" ref={node => this.input = node}/>
        <button
          onClick={() => {
          store.dispatch(addTodo(this.input.value));
          this.input.value = '';
        }}>add todo</button>
        <VisibleTodoList />
        <Footer/>
      </div>
    )
  }
}

ReactDOM.render(
  <Provider store={store}>
  <Router>
    <Route path='/:filter?' component={TodoApp} />
  </Router>
</Provider>, document.getElementById('root'))

store.subscribe(() => {
  console.dir(store.getState())
});

/* eslint-enable no-unused-vars */