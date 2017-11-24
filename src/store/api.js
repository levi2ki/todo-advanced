import { v4 } from 'uuid';
const fakeDB = {
  todos: [{
      "id": "700e529e-35d0-4673-8812-ca19bc29b920",
      "text": "hey",
      "completed": false
    },
    {
      "id": "83206f1e-e3e1-4c80-b879-5e7ba71f18ac",
      "text": "ho",
      "completed": true
    },
    {
      "id": "b74a8c6c-3c5d-415a-b2ef-9598cc2156d6",
      "text": "hoho",
      "completed": false
    },
    {
      "id": "8131396f-67b5-4b5c-84eb-f51d50fb6916",
      "text": "huhu",
      "completed": true
    }
  ]
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const addTodo = (text) => 
  delay(500).then(() => {
    const todo = {
      id: v4(),
      text,
      completed: false,
    }
    fakeDB.todos.push(todo);
    return todo;
  })

export const toggleTodo = (id) => 
  delay(500).then(() => {
    const todo = fakeDB.todos.find(t => t.id === id);
    todo.completed = !todo.completed;
    return todo;
  })

export const fetchTodos = (filter) =>
  delay(500).then(
    () => {
      if (Math.random() > 0.5) {
        throw new Error('Boom!');
      }
      
      switch (filter) {
        case 'all':
        return fakeDB.todos;
        case 'active':
        return fakeDB.todos.filter(t => !t.completed);
        case 'completed':
        return fakeDB.todos.filter(t => t.completed);
        default:
        throw new Error(`Unknown filter: ${filter}`);
      }
    }
  )