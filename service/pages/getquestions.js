// api page - /user/getQuestions

// Method: POST
// Path: /task

const { response } = require('../modules/http.js');
const { getUTCDate } = require('../modules/date.js');

async function GetAllQuestions(req, res, mysql) {
    const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
    // check request method
    if (req.method !== 'POST') return response(req, res, 405, "Error 405: Method Not Allowed");

    // get all questions
    const result = await mysql.query(req, res, "SELECT * FROM `questions`");

    await sleep(10)

    return response(req, res, 200, {
        "status": "success",
        "result": result
    });
}

module.exports = GetAllQuestions;