// api page - /answer

// Method: POST
// Path: /
// Data: { id, reply, password }

const { getUTCDate } = require('../modules/date.js');
const checkSession = require('../modules/session.js')

async function AnswerQuestion(data, mysql) {
    return new Promise(async (resolve, reject) => {
        const reply = data.reply, id = data.id;
        const givenSession = data.session;

        if (!!data.sensitive) {
            sensitive = 1;
        } else {
            sensitive = 0;
        }

        if (await checkSession(givenSession, mysql)) {
            // is this id in `questions` table?
            const inside = await mysql.query("SELECT * FROM `questions` WHERE `id` = ?",
                [data.id]);
            // if (inside.length === 0) return response(req, res, 404, "Error 404: Not Found");
            if (inside.length === 0) return reject("Error 404: Not Found");
            // check is this question already answered

            if (inside[0].answerid !== null) {
                // update `answers` table
                // time, answer, id
                const result = await mysql.query("UPDATE `answers` SET `time` = ?, `answer` = ? WHERE `id` = ?",
                    [getUTCDate(), reply, inside[0].answerid]);
                const answerid = result.insertId;
                // update `question` table
                // sensitive, id
                await mysql.query("UPDATE `questions` SET `sensitive` = ? WHERE `id` = ?",
                    [sensitive, id]);
                return resolve({
                    "status": "success",
                    "questionid": data.id,
                    "answerid": answerid
                });
            } else {
                // insert to `answers` table
                // id, time, answer
                // need to get id of the new insertd answer
                const result = await mysql.query("INSERT INTO `answers` (`time`, `answer`) VALUES (?, ?)",
                    [getUTCDate(), reply]);
                const answerid = result.insertId;

                // update `questions` table, set answerid
                await mysql.query("UPDATE `questions` SET `answerid` = ?, `sensitive` = ? WHERE `id` = ?",
                    [answerid, sensitive, id]);
                return resolve({
                    "status": "success",
                    "questionid": data.id,
                    "answerid": answerid
                });
            }
        } else {
            return reject("Error 403: Forbidden");
        }
    })
}

module.exports = AnswerQuestion;