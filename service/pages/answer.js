// api page - /answer

// Method: POST
// Path: /
// Data: { id, reply, password }

const { response } = require('../modules/http.js');
const { getUTCDate } = require('../modules/date.js');
const secret = require('../secret.json');

async function ask(req, res, mysql) {
    // check request method
    if (req.method !== 'POST') return response(req, res, 405, "Error 405: Method Not Allowed");

    const reply = req.body.reply, password = req.body.password, id = req.body.id;

    // secret.password
    if (!password || password !== secret.password) return response(req, res, 403, "Error 403: Forbidden");

    // is this id in `questions` table?
    const inside = await mysql.query(req, res,
        "SELECT * FROM `questions` WHERE `id` = ?",
        [req.body.id]);
    if (inside.length === 0) return response(req, res, 404, "Error 404: Not Found");
    // check is this question already answered
    if (inside[0].answerid !== null) return response(req, res, 403, "Error 403: Forbidden");
    
    // insert to `answers` table
    // id, time, answer
    // need to get id of the new insertd answer
    const result = await mysql.query(req, res,
        "INSERT INTO `answers` (`time`, `answer`) VALUES (?, ?)",
        [getUTCDate(), reply]);
    const answerid = result.insertId;

    // update `questions` table, set answerid
    await mysql.query(req, res,
        "UPDATE `questions` SET `answerid` = ? WHERE `id` = ?",
        [answerid, id]);
        
    
    // return
    return response(req, res, 200, {
        "status": "success",
        "questionid": req.body.id,
        "answerid": answerid
    });
}

module.exports = ask;