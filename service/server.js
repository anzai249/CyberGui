const { serverCrash } = require('./modules/http.js');
const { connect } = require('./sql/connect.js');
const { isBan } = require('./modules/security.js');
const { readFileSync } = require("fs");
const { createServer } = require("https");
const secret = require("./secret.json");

const mysql = connect()

let getQuestionIndex, getQuestionTerminal

if (secret.review) {
  getQuestionIndex = require('./pages/getquestions_review_index.js');
  getQuestionTerminal = require('./pages/getquestions_review_terminal.js');
} else {
  getQuestionIndex = require('./pages/getquestions.js');
  getQuestionTerminal = require('./pages/getquestions.js');
}

const pages = {
  "/ask": require('./pages/ask.js'),
  "/answer": require('./pages/answer.js'),
  "/like": require('./pages/like.js'),
  "/dislike": require('./pages/dislike.js'),
  "/delete": require('./pages/delete.js'),
  "/getquestions": getQuestionIndex,
  "/getquestionsterminal": getQuestionTerminal,
  "/getanswers": require('./pages/getanswers.js'),
  "/loginstate": require('./pages/loginstate.js'),
  "/login": require('./pages/login.js'),
  "/review": require('./pages/review.js')
}

// const response = createServer(1107, async (req, res) => {

//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

//   req.ip = req.connection.remoteAddress;

//   const result = await isBan(req, res, req.ip, mysql)
//   let url = req.url.split('?')[0]
//   if (url in pages) {
//     pages[url](req, res, mysql)
//   } else {
//     response(req, res, 404, `404 Not Found: ${req.url}`);
//   }
// })

process.on('uncaughtException', (err) => {
  serverCrash(err)
})

const sm2 = require('sm-crypto').sm2
let serverKey = sm2.generateKeyPairHex()
const Server = require("socket.io").Server;

const base85 = require('base85');
const { z2t, t2z } = require('zero-width-lib')
let io;

if (secret.https) {
  let httpServer = createServer({
    key: readFileSync(secret.key),
    cert: readFileSync(secret.cert)
  });
  io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
} else {
  io = new Server(secret.serverPort, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
}

io.on("connection", (socket) => {
  // get ip
  const ip = socket.handshake.address;
  if (!serverKey) {

    return socket.disconnect();
  }
  let clientKey, solve, pack;

  socket.emit("swapKey", serverKey.publicKey)
  socket.on("swapKey", (msg) => {
    clientKey = sm2.doDecrypt(msg, serverKey.privateKey, true);
    console.log(msg);
    console.log("Swap key from client success");
    solve = msg => {
      msg = z2t(msg);
      // msg = base85.decode(msg);
      msg = Buffer.from(msg).toString('utf8');
      msg = sm2.doDecrypt(msg, serverKey.privateKey, true);
      try {
        msg = JSON.parse(msg);
      } catch (e) { }
      return msg;
    }
    pack = msg => {
      msg = JSON.stringify(msg);
      msg = sm2.doEncrypt(msg, clientKey, true);
      // msg = base85.encode(msg.toString);
      msg = t2z(msg);
      try {
        msg = JSON.parse(msg);
      } catch (e) { }
      return msg;
    }
    socket.emit("update", pack({ type: "swap_OK" }))
  })
  socket.on("request", (msg) => {
    try {
      msg = solve(msg);
    } catch {
      console.error(msg);
      return;
    }
    if (!(msg.url in pages) || !msg.url) {
      socket.emit("request", pack({
        error: "404 Not Found",
        success: false,
        _request_id: msg._request_id
      }))
      return;
    }
    pages[msg.url](msg.data, mysql, ip).then(data => {
      socket.emit("request", pack({
        data,
        success: true,
        _request_id: msg._request_id
      }))
    }).catch(err => {
      socket.emit("request", pack({
        error: err,
        success: false,
        _request_id: msg._request_id
      }))
    })
  })
});

if (secret.https) {
  httpServer.listen(secret.serverPort || 1106);
}
console.log(`Server running at ` + (secret.serverPort || 1106).toString());