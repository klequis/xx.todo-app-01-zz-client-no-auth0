import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
// import { createLogger } from 'redux-logger'
import rootReducer from './root-reducer'
import DevTools from 'ui/DevTools'

const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk, /*createLogger()*/),
      DevTools.instrument()
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./root-reducer', () => {
      store.replaceReducer(rootReducer)
    })
  }

  return store
}

export default configureStore
