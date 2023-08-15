// main node server
const { createServer, serverCrash } = require('./modules/http.js');
const { connect } = require('./sql/connect.js');
const { isBan } = require('./modules/security.js');

const mysql = connect()

const pages = {
  "/ask": require('./pages/ask.js'),
  "/answer": require('./pages/answer.js'),
  "/like": require('./pages/like.js'),
  // "/comment": require('./pages/comment.js'),
  "/delete": require('./pages/delete.js'),
  "/getquestions": require('./pages/getquestions.js')
}

const response = createServer(1107, async (req, res) => {
  // console.log(req)
  // req.ip = req.headers['CF-Connecting-IP'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  // req.ip = req.ip.match(/(\d{1,3}\.){3}\d{1,3}/)[0];
  req.ip = "127.0.0.1";
  // check if this ip is banned
  // const result = await isBan(req.ip, mysql)
  let url = req.url.split('?')[0]
  // let url = "localhost:1107"
  if (url in pages) {
    pages[url](req, res, mysql)
  } else {
    response(req, res, 404, `404 Not Found: ${req.url}`);
  }
})

// catch uncaughtException
process.on('uncaughtException', (err) => {
  serverCrash(err)
})