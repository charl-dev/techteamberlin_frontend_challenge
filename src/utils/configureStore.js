import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// import createLogger from 'redux-logger'
import allReducers from '../reducers'

// const loggerMiddleware = createLogger()

export default function configureStore() {
  return createStore(allReducers, applyMiddleware(thunk))
}