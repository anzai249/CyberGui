const { getDate, getUTCTime, getUTCDate } = require('./date');

async function ban(min, ip, mysql, reason = "Too many requests") {
    // insert to `ban` table
    // ip, time, reason
    await    mysql.query(
        "INSERT INTO `ban` (`ip`, `time`, `reason`) VALUES (?, ?, ?)",
        [ip, getDate(getUTCTime() + min * 60 * 1000), reason]);
    return true;
}

async function isBan(ip, mysql) {
    // check if this ip is banned
    const result = await mysql.query(
        "SELECT * FROM `ban` WHERE `ip` = ? AND `time` > ?",
        [ip, getUTCDate()]);
    console.log(result);
    if (result.length === 0) return false;
    return result[0];
}

// like or dislike api security
async function checkLike(id, ip, mysql) {
    // if in 5 minute, this ip already like/dislike this question, ban 2 min
    // if ((await mysql.query(
    //     "SELECT * FROM `likes` WHERE `ip` = ? AND `questionid` = ? AND `time` > ?",
    //     [ip, id, getDate(getUTCTime() - 5 * 60 * 1000)]).length) !== 0) {
    //         ban(2, ip, mysql);
    //         return false;
    //     }
    
    // if in 2 sec, this ip already like/dislike something, ban 5 min
    let r = (await mysql.query(
        "SELECT * FROM `likes` WHERE `ip` = ? AND `time` > ?",
        [ip, getDate(getUTCTime() - 2 * 1000)]).length)
    if ((await mysql.query(
        "SELECT * FROM `likes` WHERE `ip` = ? AND `time` > ?",
        [ip, getDate(getUTCTime() - 2 * 1000)])).length != 0) {
            console.log(1,r);
            ban(5, ip, mysql);
            return false;
        }
        console.log(r);
    
    // if in 1 min, this ip already like/dislike 3 time same question, ban 10 min
    if ((await mysql.query(
        "SELECT COUNT(*) as `count` FROM `likes` WHERE `ip` = ? AND `question` = ? AND `time` > ?",
        [ip, id, getDate(getUTCTime() - 60 * 1000)]))[0].count >= 3) {
            ban(10, ip, mysql);
            return false;
        }
    return true;
}

module.exports = {
    ban,
    isBan,
    checkLike
}