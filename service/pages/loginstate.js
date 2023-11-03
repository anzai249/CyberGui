// api page - /user/loginstate

// Method: POST
// Path: /task

const checkSession = require('../modules/session.js')

async function LoginState(data, mysql) {
    return new Promise(async (resolve, reject) => {
        const givenSession = data.session;

        if (await checkSession(givenSession, mysql)) {
            return resolve({
                "status": "success",
                "logined": true
            });
        } else {
            return reject("Session Expired!");
        }
    })
}

module.exports = LoginState;