import * as selectors from './selectors'
export { selectors as alerts }

export const SUCCESS = 'alerts.success'
export const FAILURE = 'alerts.failure'
export const CLEAR = 'alerts.clear'

export const showSuccessAlert = message => ({
  type: SUCCESS,
  payload: { message },
})
export const showFailureAlert = message => ({
  type: FAILURE,
  payload: { message },
})
export const clearAlerts = () => ({
  type: CLEAR,
})

const NO_MESSAGES = []
/** @type {Alerts} */
export const initialState = {
  messages: NO_MESSAGES,
}

/**
 * @param {Alerts} state
 * @param {Action} action
 * @returns {Countries}
 */
export default function(state = initialState, { type, payload }) {
  switch (type) {
    case SUCCESS:
      return {
        ...state,
        messages: [...state.messages, { type: 'success', message: payload.message }],
      }
    case FAILURE:
      return {
        ...state,
        messages: [...state.messages, { type: 'failure', message: payload.message }],
      }
    case CLEAR:
      return {
        ...state,
        messages: NO_MESSAGES,
      }
    default:
      return state
  }
}

/**
 * @typedef {Object} AlertMessage
 * @prop {('success'|'failure')} type
 * @prop {String} messages
 */

/**
 * @typedef {Object} Alerts
 * @prop {AlertMessage[]} messages
 */

/** @typedef {import('../.').Action} Action */
