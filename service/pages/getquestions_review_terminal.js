// api page - /user/GetAllQuestionsReview

// Method: POST
// Path: /task
const checkSession = require('../modules/session.js')

async function GetAllQuestionsReviewTerminal(data, mysql) {
    return new Promise(async (resolve, reject) => {
        const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
        const givenSession = data.session;
        await sleep(50)
        if (await checkSession(givenSession, mysql)) {
            const result = await mysql.query("SELECT * FROM `questions` WHERE `deleted` != 1");
            return resolve({
                "status": "success",
                "result": result
            });
        } else {
            return reject("Error 403: Forbidden");
        }
    })
}

module.exports = GetAllQuestionsReviewTerminal;