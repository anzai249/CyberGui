// Author: anzai249
// CreateTime: 2023.11.04 0:28
const md5 = require("blueimp-md5")
const { getUTCDate, getUTCTime } = require('../modules/date.js');

async function checkSession(session, mysql) {
    const savedSession = await mysql.query("SELECT `session` FROM `sid` WHERE `id` = 1");
    const savedTime = await mysql.query("SELECT `time` FROM `sid` WHERE `id` = 1");

    if (savedSession.length === 0 || savedTime.length === 0) {
        return false;
    }

    const givenSession = session;
    const dateTime = savedTime[0].time

    if (md5(savedSession[0].session) === givenSession && Date.parse(getUTCDate()) - Date.parse(dateTime) <= 1200000) {
        await mysql.query("UPDATE `sid` SET `time` = ? WHERE `id` = 1",
            [getUTCDate()]);
        return true;
    } else {
        return false;
    }
}

module.exports = checkSession;