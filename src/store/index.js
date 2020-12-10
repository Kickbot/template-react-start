import { all } from 'redux-saga/effects'
import { combineReducers, createStore } from 'redux'
import { enhancers, runSideEffects } from './config'

import alerts from './alerts'

export function* sideEffects() {
  return yield all([
    
  ])
}

/**
 * @returns {Reducer}
 */
export function getRootReducer() {
  return combineReducers({
    alerts,
  })
}

/**
 * @param {Reducer} [rootReducer]
 * @param {function} [saga=sideEffects]
 * @param {object} [initialState={}]
 * @returns {Store}
 */
export default function (rootReducer = getRootReducer(), saga = sideEffects, initialState) {
  const store = createStore(rootReducer, initialState, enhancers)
  saga && runSideEffects(saga)
  return store
}

/** @typedef {import('redux').Store} Store */
/** @typedef {import('redux').Reducer} Reducer */
/**
 * @typedef {object} State
 * @prop {import('./auth').Auth} auth
 * @prop {import('./countries').Countries} countries
 */
/**
 * @typedef {object} Action
 * @property {string} type
 * @property {*} payload
 */