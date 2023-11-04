// api page - /user/dislike

// Method: POST
// Path: /task
// Data: { like, dislike }

const { getUTCDate } = require('../modules/date.js');
const { isBan, checkLike } = require('../modules/security.js')

async function dislike(data, mysql, ip) {
    return new Promise(async (resolve, reject) => {
        try {
            const id = data.id;

            if (await isBan(ip, mysql)) return reject("Error 403: Forbidden");
            else if (!await checkLike(id, ip, mysql)) return reject("Error 403: Forbidden");

            // is this id in `questions` table?
            const inside = await mysql.query("SELECT * FROM `questions` WHERE `id` = ?",
                [data.id]);
            if (inside.length === 0) return reject("Error 404: Not Found");

            // insert to `question` table
            // title, content, time, like, dislike, sensitive, answerid(null)
            await mysql.query("UPDATE `questions` SET `dislike` = `dislike` + 1 WHERE `id` = ?",
                [id]);

                const result = await mysql.query("INSERT `likes` (`ip`, `question`, `time`) VALUES (?, ?, ?)",
                    [ip, id, getUTCDate()]);

            // return
            return resolve({
                "status": "success",
                "questionid": result.insertId
            });
        } catch (err) {
            return reject(err);
        }
    })
}

module.exports = dislike;