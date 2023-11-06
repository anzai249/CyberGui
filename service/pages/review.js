// api page - /review

const checkSession = require('../modules/session.js')

async function Review(data, mysql) {
    return new Promise(async (resolve, reject) => {
        const id = data.id;
        const givenSession = data.session;

        if (await checkSession(givenSession, mysql)) {
            // is this id in `questions` table?
            const inside = await mysql.query("SELECT * FROM `questions` WHERE `id` = ?",
                [id]);
            // if (inside.length === 0) return response(req, res, 404, "Error 404: Not Found");
            if (inside.length === 0) return reject("Error 404: Not Found");
            // check is this question already reviewed

            if (!inside[0].reviewed) {
                // update `question` table
                await mysql.query("UPDATE `questions` SET `reviewed` = ? WHERE `id` = ?",
                    [1, id]);
                return resolve({
                    "status": "success",
                    "questionid": id
                });
            } else {
                return reject("Error 403: Forbidden");
            }
        } else {
            return reject("Error 403: Forbidden");
        }
    })
}

module.exports = Review;