// api page - /user/ask

// Method: POST
// Path: /task
// Data: { question }

const { response } = require('../modules/http.js');
const { getUTCDate } = require('../modules/date.js');

async function ask(data, mysql) {
    return new Promise(async (resolve, reject) => {
        try {
            // check request method
            // if (req.method !== 'POST') return response(req, res, 405, "Error 405: Method Not Allowed");

            const title = data.title, content = data.content, sensitive = data.sensitive;

            // at least 5 characters
            if (title === 'undefined' || title === undefined || !title || title.length < 5 || content.length > 50) return reject("Illegal Title!");
            // at least 5 characters
            if (content === 'undefined' || content === undefined || !content || content.length < 5 || content.length > 150) return reject("Illegal Content!");
            // 1/0
            if (sensitive === 'undefined' || sensitive === undefined || (sensitive != 1 && sensitive != 0)) return reject("Illegal Sensitive!");

            // insert to `question` table
            // title, content, time, like, dislike, sensitive, answerid(null)
            const result = await mysql.query("INSERT INTO `questions` (`title`, `content`, `time`, `like`, `dislike`, `sensitive`, `answerid`) VALUES (?, ?, ?, ?, ?, ?, ?)",
                [title, content, getUTCDate(), 0, 0, sensitive, null]);

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

module.exports = ask;