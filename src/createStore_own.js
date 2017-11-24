/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
// import {createStore} from 'redux';
import {Provider} from 'react-redux';

const counter = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}

// NOTE: module pattern HACK: own createStore function implementation
 const createStore = (reducer) => {
    let state;
    let listeners = [];

    const getState = () => state;

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    }

    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => l !== listener);
        }
    }
    // get initial state
    dispatch({});
    return {getState, dispatch, subscribe};
}

const store = createStore(counter);

class App extends React.Component {
    render() {
        return (
            <div>
                <div>
                    {this.props.value}
                </div>
                <button onClick={this.props.onEncr}>+</button>
                <button onClick={this.props.onDecr}>-</button>
            </div>
        )
    }
}

const render = () => {
    ReactDOM.render(
        <App
        value={store.getState()}
        onDecr={() => {
        store.dispatch({type: 'DECREMENT'})
    }}
        onEncr={() => {
        store.dispatch({type: 'INCREMENT'})
    }}/>, document.getElementById('root'));
}
store.subscribe(render);
render();
/* eslint-enable no-unused-vars */
