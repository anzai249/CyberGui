// main node server
const { createServer, serverCrash } = require('./modules/http.js');
const { connect } = require('./sql/connect.js');
const { isBan } = require('./modules/security.js');

const mysql = connect()

const pages = {
  "/ask": require('./pages/ask.js'),
  "/answer": require('./pages/answer.js'),
  "/like": require('./pages/like.js'),
  "/dislike": require('./pages/dislike.js'),
  // "/comment": require('./pages/comment.js'),
  "/delete": require('./pages/delete.js'),
  "/getquestions": require('./pages/getquestions.js'),
  "/getanswers": require('./pages/getanswers.js')
}

const response = createServer(1107, async (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // req.ip = req.headers['CF-Connecting-IP'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  // req.ip = req.ip.match(/(\d{1,3}\.){3}\d{1,3}/)[0];
  req.ip = req.connection.remoteAddress;
  // check if this ip is banned
  const result = await isBan(req, res, req.ip, mysql)
  let url = req.url.split('?')[0]
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

const { RSA, Crypt } = require('hybrid-crypto-js');
const rsa = new RSA();
const crypt = new Crypt();
let serverKey
rsa.generateKeyPairAsync().then(keyPair => (serverKey = keyPair, console.log("Keypair ready")));

// const crypt.encrypt = (key, msg) => {
//   console.log(msg);
//   console.log("encrypt", JSON.parse(crypt.encrypt(key, msg)).cipher);
//   console.log("keys", key, api.serverKey);
//   return JSON.parse(crypt.encrypt(key, msg)).cipher;
// }
// const crypt.decrypt = (key, msg) => {
//   console.log(key, msg);
//   return JSON.parse(crypt.decrypt(key, msg)).message;
// }

// const NodeRSA = require('node-rsa');
// const serverKey = new NodeRSA({ b: 1024 });
const Server = require("socket.io").Server;
// console.log(serverKey.exportKey('pkcs8-public-pem'));
const base85 = require('base85');
const { z2t, t2z } = require('zero-width-lib')

const io = new Server(1106, {
  // options
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  if (!serverKey) {
    // disconnect
    return socket.disconnect();
  }
  console.log("a user connected");
  let clientKey, solve, pack;
  // socket.emit("swapKey", serverKey.exportKey('pkcs8-public-pem'))
  socket.emit("swapKey", serverKey.publicKey)
  socket.on("swapKey", (msg) => {

    // clientKey = new NodeRSA(serverKey.decrypt(msg, 'utf8'), 'pkcs8-public-pem')
    // console.log("Swap key from client", msg);
    clientKey = crypt.decrypt(serverKey.privateKey, msg).message;
    console.log(msg);
    console.log("Swap key from client success");
    solve = msg => {
      msg = z2t(msg);
      msg = base85.decode(msg);
      msg = Buffer.from(msg).toString('utf8');
      // msg = serverKey.decrypt(msg, 'utf8');
      msg = crypt.decrypt(serverKey.privateKey, msg).message;
      try {
        msg = JSON.parse(msg);
      } catch (e) { }
      return msg;
    }
    pack = msg => {
      msg = JSON.stringify(msg);
      // msg = clientKey.encrypt(msg, 'base64');
      msg = crypt.encrypt(clientKey, msg);
      msg = base85.encode(msg);
      msg = t2z(msg);
      try {
        msg = JSON.parse(msg);
      } catch (e) { }
      return msg;
    }
    socket.emit("update", pack({ type: "swap_OK" }))
  })
  socket.on("request", (msg) => {
    msg = solve(msg);
    // console.log(msg);
    if (!msg.url in pages) {
      socket.emit("request", pack({
        error: "404 Not Found",
        success: false,
        _request_id: msg._request_id
      }))
      return;
    }
    pages[msg.url](msg.data, mysql).then(data => {
      socket.emit("request", pack({
        data,
        success: true,
        _request_id: msg._request_id
      }))
      // console.log("return to client", data);
    }).catch(err => {
      socket.emit("request", pack({
        error: err,
        success: false,
        _request_id: msg._request_id
      }))
    })
  })
});