const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  // Complete aqui
  const {username} = request.headers

  const user = users.find(user => user.username === username)

  if (!user) {
    return response.status(404).json({error: 'User not found'})
  }

  request.user = user
  return next()
}

app.post('/users', (request, response) => {
  // Complete aqui
  const {name, username} = request.body

  const userAlreadyExists = users.find((user) => user.username === username)

  if (userAlreadyExists) {
    return response.status(400).json({error: 'User Already Exists'})
  }
  const createUser = {
    id: uuidv4(),
    name,
    username,
    todos: []
  }

  users.push(createUser)

  return response.status(201).json(createUser)
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
  const {user} = request

  return response.json(user.todos)
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
  const {user} = request
  const {title, deadline} = request.body

  const newTodo = {
    id: uuidv4(),
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date()
  }
   user.todos.push(newTodo)

   return response.status(201).json(newTodo)
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
  const {id} = request.params
  const {user} = request
  const {title, deadline} = request.body

  const checkTodo = user.todos.find((todo) => todo.id === id)

  if (!checkTodo) {
    return response.status(404).json({error: 'Todo not found'})
  }

  checkTodo.title = title
  checkTodo.deadline = new Date(deadline)

  return response.json(checkTodo)
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
  const {user} = request
  const {id} = request.params

  const todoExists = user.todos.find((todo) => todo.id === id)

  if (!todoExists) {
    return response.status(404).json({error: 'Todo not found'})
  }

  todoExists.done = true

  return response.json(todoExists)
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
  const {user} = request
  const {id} = request.params

  const todoExists = user.todos.find((todo) => todo.id === id)

  if (!todoExists) {
    return response.status(404).json({error: 'Todo not found'})
  }

  const findTodo = user.todos.findIndex(todo => todo.id === id)

  user.todos.splice(findTodo, 1)

  return response.status(204).send()
});

module.exports = app;