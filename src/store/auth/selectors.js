export function getUser(state) {
  return state.auth.user
}

export function getIsAuthenticated(state) {
  return state.auth.isAuthenticated
}