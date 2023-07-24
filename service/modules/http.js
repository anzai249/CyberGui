const http = require('http');
const fs = require('fs');
const { getDate } = require('./date.js');

/**
 * @param port
 * @param callback
 * @returns {(req: Request, res: Response, code: number, data: Object | String | undefined) => void}
 */
function createServer(port, callback) {
  // setup file ./server.log && ./server.error.log && ./server.crash.log
  if (!fs.existsSync('./server.log')) fs.writeFileSync('./server.log', '');
  if (!fs.existsSync('./server.error.log')) fs.writeFileSync('./server.error.log', '');
  if (!fs.existsSync('./server.crash.log')) fs.writeFileSync('./server.crash.log', '');

  const server = http.createServer((req, res) => {
    let reqData = '';
    req.on('data', (chunk) => { reqData += chunk })
    req.on('end', () => {
      req.body = reqData && JSON.parse(reqData);
      callback(req, res);
    })
  })
  server.listen(port)
  console.log(`Server running at http://localhost:${port}/`);
  return response;
}

function response(req, res, code, data, error = false, errModule = 'server', errMsg = 'Unknown Error') {
  if (error) serverError(errModule, errMsg);
  if (typeof data === 'object') serverLog(req, res, code, JSON.stringify(data));
  else serverLog(req, res, code, data)
  // if object
  if (typeof data === 'object') {
    res.writeHead(code, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(data));
    res.end();
  } else {
    res.writeHead(code, { 'Content-Type': 'text/plain' });
    res.write(data);
    res.end();
  }
}

/** Private function, not exported
 * @param req
 * @param res
 * @param {Number} status
 * @param {String} response
 *
 * @returns {void}
 */
function serverLog(req, res, status, response) {
  const time = getDate();
  const log = `${time} | ${status} | ${req.method} | ${req.url} | ${response}`;
  fs.appendFileSync('./server.log', log + '\n');
}

/**
 *
 */
function serverError(errModule, errMsg) {
  const time = getDate();
  const error = `[${errModule} ${time}] ${errMsg}`
  console.log("New Server Error: " + error)
  fs.appendFileSync('./server.error.log', error + '\n');
}

/**
 * @param {Error} err
 *
 * @returns {void}
 */
function serverCrash(err) {
  console.log("Error when " + getDate())
  fs.writeFileSync('./server.crash.log', err.stack);
  process.exit(1);
}

module.exports = {
  createServer,
  serverCrash,
  serverError,
  response
}