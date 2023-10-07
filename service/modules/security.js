const { getDate, getUTCTime, getUTCDate } = require('./date');

function ban(min, ip, reason = "Too many requests") {
    // insert to `ban` table
    // ip, time, reason
    mysql.query(req, res,
        "INSERT INTO `ban` (`ip`, `time`, `reason`) VALUES (?, ?, ?)",
        [ip, getDate(getUTCTime() + min * 60 * 1000), reason]);
}

async function isBan(req,  ip, mysql) {
    // check if this ip is banned
    const result = await mysql.query(req, res,
        "SELECT * FROM `ban` WHERE `ip` = ? AND `time` > ?",
        [ip, getUTCDate()]);
    if (result.length === 0) return false;
    return result[0];
}

// like or dislike api security
async function like(req, res, mysql) {
    // if in 5 minute, this ip already like/dislike this question, ban 2 min
    if ((await mysql.query(req, res,
        "SELECT * FROM `like` WHERE `ip` = ? AND `questionid` = ? AND `time` > ?",
        [req.ip, req.body.id, getDate(getUTCTime() - 5 * 60 * 1000)]).length) !== 0) {
            ban(2, req.ip);
            return false;
        }
    
    // if in 3 sec, this ip already like/dislike something, ban 5 min
    if ((await mysql.query(req, res,
        "SELECT * FROM `like` WHERE `ip` = ? AND `time` > ?",
        [req.ip, getDate(getUTCTime() - 3 * 1000)]).length) !== 0) {
            ban(5, req.ip);
            return false;
        }
    
    // if in 1 min, this ip already like/dislike 3 time same question, ban 10 min
    if ((await mysql.query(req, res,
        "SELECT COUNT(*) as `count` FROM `like` WHERE `ip` = ? AND `questionid` = ? AND `time` > ?",
        [req.ip, req.body.id, getDate(getUTCTime() - 60 * 1000)]))[0].count >= 3) {
            ban(10, req.ip);
            return false;
        }
}

module.exports = {
    ban,
    isBan,
    like
}