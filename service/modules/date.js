function getDate(time) {
  // return y-m-d h:m:s
  // get server time
  const date = time ? new Date(time) : new Date()
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

function getUTCDate(time) {
  // return y-m-d h:m:s
  // get server time
  const date = time ? new Date(time) : new Date()
  // need 0 before single digit
  const month = date.getUTCMonth() + 1 < 10 ? `0${date.getUTCMonth() + 1}` : date.getUTCMonth() + 1
  const day = date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : date.getUTCDate()
  const hour = date.getUTCHours() < 10 ? `0${date.getUTCHours()}` : date.getUTCHours()
  const minute = date.getUTCMinutes() < 10 ? `0${date.getUTCMinutes()}` : date.getUTCMinutes()
  const second = date.getUTCSeconds() < 10 ? `0${date.getUTCSeconds()}` : date.getUTCSeconds()
  return `${date.getUTCFullYear()}-${month}-${day} ${hour}:${minute}:${second}`
}

function getUTCTime() {
  // return timestamp(UTC)
  // get server timestamp
  const date = new Date()
  // convert to UTC
  date.setFullYear(date.getUTCFullYear())
  date.setMonth(date.getUTCMonth())
  date.setDate(date.getUTCDate())
  date.setHours(date.getUTCHours())
  date.setMinutes(date.getUTCMinutes())
  date.setSeconds(date.getUTCSeconds())
  date.setMilliseconds(date.getUTCMilliseconds())
  return date.getTime()
}

function toNormalFormat(date) {
  // remove T Z and .xxx
  return date.replace("T", " ").replace("Z", "").replace(/\.\d{3}/, "")
}

module.exports = {
  getDate,
  getUTCDate,
  getUTCTime,
  toNormalFormat
}