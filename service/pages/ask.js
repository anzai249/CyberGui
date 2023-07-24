// api page - /user/ask

// Method: POST
// Path: /task
// Data: { question }

const { response } = require('../modules/http.js');
const { getUTCDate } = require('../modules/date.js');

async function ask(req, res, mysql) {
    // check request method
    if (req.method !== 'POST') return response(req, res, 405, "Error 405: Method Not Allowed");

    const title = req.body.title, content = req.body.content, sensitive = req.body.sensitive;
    // at last 5 characters
    if (!title || title.length < 5) return response(req, res, 400, "Error 400: Bad Request");
    // at last 10 characters
    if (!content || content.length < 10) return response(req, res, 400, "Error 400: Bad Request");
    // 1/0
    if (!sensitive || (sensitive !== 1 && sensitive !== 0)) return response(req, res, 400, "Error 400: Bad Request");


    // insert to `question` table
    // title, content, time, like, dislike, sensitive, answerid(null)
    const result = await mysql.query(req, res,
        "INSERT INTO `questions` (`title`, `content`, `time`, `like`, `dislike`, `sensitive`, `answerid`) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [title, content, getUTCDate(), 0, 0, sensitive, null]);
    
    // return
    return response(req, res, 200, {
        "status": "success",
        "questionid": result.insertId
    });
}

module.exports = ask;