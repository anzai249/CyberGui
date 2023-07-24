const {getUTCDate} = require('../modules/date.js');

/**
 * @param req {Request} http request
 * @param res {Response} http response
 * @param query {function} mysql query function
 * @param userinfo {string} username/uid
 *
 * @return
 */
async function userdata(req, res, query, userinfo) {
  const result = await query(req, res, "SELECT * FROM `userdata` WHERE `username` = ? OR `userid` = ?", [userinfo, userinfo])
  if (result.length === 0) return false
  return result[0]
}

async function islogin(req, res, query, token = req.headers.authorization) {
  if (!token) return false
  const result = await query(req, res,
    "SELECT * FROM `userlogin` WHERE `token` = ? AND `expireTime` > ?",
    [token, getUTCDate()])
  if (result.length === 0) return false
  await query(req, res,
    "CALL update_expire_time(?)",
    [token])
  // check if token expired
  const now = getUTCDate()
  const time = new Date(result[0].expireTime)
  // if now > time, token expired
  if (now > time) return false
  return result[0]
}

module.exports = {
  userdata,
  islogin
}