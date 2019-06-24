import {
  TODO_CREATE_KEY,
  TODOS_READ_REQUEST_KEY,
  TODOS_READ_KEY,
  TODOS_CREATE_REQUEST_KEY,
  TODOS_READ_BY_ID_REQUEST_KEY,
  TODOS_DELETE_REQUEST_KEY
} from './constants'
import { createRequestThunk } from '../action-helpers'
import api from 'api'
import { red } from 'logger'
import { purple, green } from 'logger'

export const todoAdd = (newTodo) => {
  return {
    type: TODO_CREATE_KEY,
    payload: newTodo
  }
}

// Read
export const todosRead = (todos) => {
  purple('todo read **')
  return {
    type: TODOS_READ_KEY,
    payload: todos
  }
}

export const todosReadRequest = createRequestThunk({
  request: api.todos.read,
  key: TODOS_READ_REQUEST_KEY,
  success: [todosRead],
  failure: [
    (error) => console.log('(7) todoReadRequest: request failed', error)
  ]
})

export const todosReadByIdRequest = createRequestThunk({
  request: api.todos.readById,
  key: TODOS_READ_BY_ID_REQUEST_KEY,
  success: [todosRead],
  failure: [
    (error) => red('(7) todoReadByIdRequest: request failed', error)
  ]
})


// Create
export const todoCreateRequest = createRequestThunk({
  request: api.todos.create,
  key: TODOS_CREATE_REQUEST_KEY,
  success: [todosReadRequest],
  failure: [
    (error) =>
      console.log('(7) todosReadRequest: request failed', error)
  ]
})

// Delete
export const todoDeleteRequest = createRequestThunk({
  request: api.todos.delete,
  key: TODOS_DELETE_REQUEST_KEY,
  success: [todosReadRequest],
  failure: [
    (error) =>
      console.log('(7) todoDeleteRequestCall: request failed', error)
  ]
})
