// api page - /delete

// Method: POST
// Path: /
// Data: { id, password }

const { response } = require('../modules/http.js');
const { getUTCDate } = require('../modules/date.js');
const secret = require('../secret.json');

async function DeleteQuestion(req, res, mysql) {
    // check request method
    if (req.method !== 'POST') return response(req, res, 405, "Error 405: Method Not Allowed");

    const password = req.body.password, id = req.body.id;

    // secret.password
    if (!password || password !== secret.password) return response(req, res, 403, "Error 403: Forbidden");

    // is this id in `questions` table?
    const inside = await mysql.query(req, res,
        "SELECT * FROM `questions` WHERE `id` = ?",
        [req.body.id]);
    if (inside.length === 0) return response(req, res, 404, "Error 404: Not Found");

    // get answer id
    const result = await mysql.query(req, res,
        "SELECT `answerid` FROM `questions` WHERE `id` = ?",
        [id]);

    const answerid = result.answerid;
    // delete questions
    await mysql.query(req, res,
        "DELETE * FROM `questions` WHERE `id` = ?",
        [id]);

    if (answerid) {
        // delete that answer
        await mysql.query(req, res,
            "DELETE * FROM `answers` WHERE `id` = ?",
            [answerid]);

    }

    return response(req, res, 200, {
        "status": "success"
    });
}

module.exports = DeleteQuestion;