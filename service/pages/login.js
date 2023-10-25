// api page - /user/login

// Method: POST
// Path: /task


const md5 =  require("blueimp-md5")
const password = require('../secret.json').password;

async function Login(data, mysql) {
    return new Promise(async (resolve, reject) => {

        const givenPassword = data.password;
        if (md5(password) === givenPassword) {
            return resolve({
                "status": "success"
            });
        } else {
            return reject("Password Wrong!");
        }
    })
}

module.exports = Login;