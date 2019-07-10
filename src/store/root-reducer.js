import { combineReducers } from 'redux'
import { todosReducer } from './todo/reducers'
import { requestsReducer } from './requests/reducers'
import { authReducer } from './auth/reducers'

const rootReducer = combineReducers({
  todos: todosReducer,
  requests: requestsReducer,
  auth: authReducer
})

export default rootReducer
