// api page - /delete

// Method: POST
// Path: /
// Data: { id, password }

async function DeleteQuestion(data, mysql) {

    const givenSession = data.session;
    const id = data.id
    if (await checkSession(givenSession, mysql)) {

        // is this id in `questions` table?
        const inside = await mysql.query(req, res,
            "SELECT * FROM `questions` WHERE `id` = ?",
            [req.body.id]);
        if (inside.length === 0) return reject("Error 404: Not Found");

        // get answer id
        const result = await mysql.query(req, res,
            "SELECT `answerid` FROM `questions` WHERE `id` = ?",
            [id]);

        // delete questions
        await mysql.query(req, res,
            "UPDATE `questions` SET `deleted` = 0 WHERE `id` = ?",
            [id]);

        return resolve({
            "status": "success",
            "questionid": id,
        });
    } else {
        return reject("Error 403: Forbidden");
    }
}

module.exports = DeleteQuestion;