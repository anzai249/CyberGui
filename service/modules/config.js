const fs = require('fs');

// return ../config.json
/** Get config.json
 * @returns {UserConfig} config.json
 */
function getConfig() {
  return JSON.parse(String(fs.readFileSync('./config.json')));
}

function setConfig(config) {
  fs.writeFileSync('./config.json', JSON.stringify(config));
}

module.exports = {
  getConfig,
  setConfig,
}