import { SET_USER, SET_IS_AUTHENTICATED } from './constants'
import { purple } from 'logger'


export const setUser = (user) => {
  purple('setUser: user', user)
  return {
    type: SET_USER,
    payload: { user }
  }
}

export const setIsAuthenticated = (value) => {
  return {
    type: SET_IS_AUTHENTICATED,
    payload: { value }
  }
}