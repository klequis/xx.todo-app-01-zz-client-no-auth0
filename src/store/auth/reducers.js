import { SET_USER, SET_IS_AUTHENTICATED } from './constants'
// eslint-disable-next-line
import { blue } from 'logger'
export function authReducer(
  state = {},
  action
) {
  blue('authReducer: state', state)
  blue('authReducer: action', action)
  switch (action.type) {
    case SET_USER:
      return action.payload.user
    case SET_IS_AUTHENTICATED:
      return action.payload.value
    default:
      return state
  }
}