import { WAIT_FOR_ACTION, ERROR_ACTION } from 'redux-wait-for-action'
import { takeLatest, put, take } from 'redux-saga/effects'

/**
 * @param {String} baseName
 * @returns {CompoundActionType}
 */
export const compoundActionType = baseName => ({
  START: baseName,
  SUCCESS: baseName + '.success',
  FAILURE: baseName + '.failure',
})

/**
 * @deprecated
 * @param {CompoundActionType} compoundActionType
 * @returns {function(payload:*):Action}
 */
export const compoundActionCreator = ({ START, SUCCESS }) => payload => ({
  type: START,
  payload,
  [WAIT_FOR_ACTION]: SUCCESS,
})
/**
 * @param {CompoundActionType} compoundActionType
 * @returns {function(payload:*):Action}
 */
export const compoundErrorActionCreator = ({ START, SUCCESS, FAILURE }) => payload => ({
  type: START,
  payload,
  [WAIT_FOR_ACTION]: SUCCESS,
  [ERROR_ACTION]: FAILURE,
})

/**
 * @param {CompoundActionType} param1
 * @param {function(payload:any):any} fn
 */
export const attachSideEffect = ({ START, SUCCESS, FAILURE } = {}, fn, sideEffect = takeLatest) => {
  if (typeof START !== 'string') {
    throw new TypeError('START is not of string type')
  }
  if (typeof SUCCESS !== 'string') {
    throw new TypeError('SUCCESS is not of string type')
  }
  if (typeof FAILURE !== 'string') {
    throw new TypeError('FAILURE is not of string type')
  }

  return sideEffect(START, asyncSideEffect(fn, { SUCCESS, FAILURE }))
}

/**
 * @param {function(payload:any):any} fn
 * @param {CompoundActionType} param1
 */
export const asyncSideEffect = (fn, { SUCCESS, FAILURE }) =>
  function*({ payload = {} } = {}, ...args) {
    try {
      const result = yield* fn(payload, ...args)
      yield put({ type: SUCCESS, payload: result })

      // make sure that a callback runs *after* a store change caused by SUCCESS action
      yield take(SUCCESS)

      return result
    } catch ({ error, errors }) {
      yield put({
        type: FAILURE,
        error: { error, errors }, //required for ERROR_ACTION (redux-wait-for-action)
        payload: { error, errors },
      })
      yield take(FAILURE)
    }
  }

/**
 * @typedef {Object} CompoundActionType
 * @prop {String} START
 * @prop {String} SUCCESS
 * @prop {String} FAILURE
 */

/** @typedef {import('./index').Action} Action */
