// api page - /user/dislike

// Method: POST
// Path: /task
// Data: { like, dislike }

const { response } = require('../modules/http.js');
const { getUTCDate } = require('../modules/date.js');
// const { isBan, like } = require('../modules/security.js')

async function dislike(req, res, mysql) {
    // check request method
    if (req.method !== 'POST') return response(req, res, 405, "Error 405: Method Not Allowed");

    const id = req.body.id;

    // I THINK YOU SHOULD PUT THE SECURITY CODE HERE

    // is this id in `questions` table?
    const inside = await mysql.query(req, res,
        "SELECT * FROM `questions` WHERE `id` = ?",
        [req.body.id]);
    if (inside.length === 0) return response(req, res, 404, "Error 404: Not Found");

    // insert to `question` table
    // title, content, time, like, dislike, sensitive, answerid(null)
    const result = await mysql.query(req, res,
        "UPDATE `questions` SET `dislike` = `dislike` + 1 WHERE `id` = ?",
        [id]);

    // return
    return response(req, res, 200, {
        "status": "success",
        "questionid": result.insertId
    });
}

module.exports = dislike;