// eslint-disable-next-line import/no-unassigned-import
import 'regenerator-runtime/runtime'
import createSagaMiddleware from 'redux-saga'
import createReduxWaitForMiddleware from 'redux-wait-for-action'
import { applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

const middlewares = []

/**
 * Add saga support
 * @see https://redux-saga.js.org/
 */
const sagaMiddleware = createSagaMiddleware()
middlewares.push(sagaMiddleware)

export const runSideEffects = saga => sagaMiddleware.run(saga)

/**
 * Adds a way to turn `dispatch(...)` into a Promise
 * @example
    store.dispatch({
      type: ACTION,
      [WAIT_FOR_ACTION]: ACTION_COMPLETE,
      payload: null
    }) // will return a Promise
  * @see https://github.com/Chion82/redux-wait-for-action
  */
middlewares.push(createReduxWaitForMiddleware())

/**
 * middlewares composition
 * @see https://redux.js.org/advanced/middleware
 */
let enhancers = applyMiddleware(...middlewares)

/**
 * !STRICTLY RECOMMENDED!
 * In order to have more friendly development with redux use react-native-debugger
 * @see https://github.com/jhen0409/react-native-debugger
 */
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== 'production') {
  enhancers = composeWithDevTools(enhancers)
}

export { enhancers }