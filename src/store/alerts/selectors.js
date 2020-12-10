import { createSelector } from 'reselect'

export const alertMessage = state => state.alerts.messages[0] || null

export const type = createSelector(
  alertMessage,
  alertMessage => (alertMessage && alertMessage.type) || null,
)
export const message = createSelector(
  alertMessage,
  alertMessage => (alertMessage && alertMessage.type) || null,
)

/** @typedef {import('../index').State} State */
