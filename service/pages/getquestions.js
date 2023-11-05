// api page - /user/getQuestions

// Method: POST
// Path: /task

async function GetAllQuestions(data, mysql) {
    return new Promise(async (resolve, reject) => {
        const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
        // check request method
        // if (req.method !== 'POST') return response(req, res, 405, "Error 405: Method Not Allowed");

        // get all questions
        const result = await mysql.query("SELECT * FROM `questions` WHERE `deleted` != 1");

        await sleep(50)

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

module.exports = GetAllQuestions;