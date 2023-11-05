// api page - /user/getQuestions

// Method: POST
// Path: /task

async function GetAllAnswers(body, mysql) {
    return new Promise(async (resolve, reject) => {
        // check request method
        // if (req.method !== 'POST') return response(req, res, 405, "Error 405: Method Not Allowed");

        // get all questions
        const result = await mysql.query("SELECT * FROM `answers`");

        // return response(req, res, 200, {
        //     "status": "success",
        //     "result": result
        // });
        return resolve({
            "status": "success",
            "result": result
        });
    })
}

module.exports = GetAllAnswers;