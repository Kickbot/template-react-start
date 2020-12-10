/**
 *
 * @param  {...String|null} names
 * @returns {String}
 */
export const cn = (...names) =>
  names.filter(value => !!value && typeof value === 'string').join(' ')

/**
 * @param {String} value - date in ISO (YYYY-MM-DD) format
 * @returns {String} date in server-side format
 */
// export const toServerDate = value => (value ? new Date(value).toLocaleDateString('en-US') : null)

// export const toISODate = value => {
//   const date = new Date(Date.parse(value))
//   if (!date || isNaN(date)) return null
//   return [
//     date.getFullYear(),
//     (date.getMonth() + 1).toString().padStart(2, '0'),
//     date
//       .getDay()
//       .toString()
//       .padStart(2, '0'),
//   ].join('-')
// }

// export const toHumanDateTime = value => {
//   if (!value) return value
//   const date = new Date(value)
//   return date
//     .toLocaleString('en-US', {
//       timeZone: 'UTC',
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: 'numeric',
//       minute: 'numeric',
//       second: undefined,
//     })
//     .replace(' PM', 'pm')
//     .replace(' AM', 'am')
// }

// export const todayDate = () => new Date().toISOString().replace(/T.*/, '')

// export const nowTimestamp = () => new Date().valueOf()
// export const timestampAfter = seconds => (seconds ? nowTimestamp() + (seconds - 1) * 1000 : null)

// export const isFutureTimestamp = timestamp => nowTimestamp() < timestamp
