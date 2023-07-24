const fs = require('fs');

/**
 * @typedef {Object} UserConfig
 * @property {Object} user
 * @property {Object} user.new
 * @property {Object} user.new.gift
 * @property {boolean} user.new.gift.enabled
 * @property {number} user.new.gift.word
 * @property {string} user.new.gift.description
 * @property {boolean} user.canRegister
 * @property {boolean} user.canLogin
 */

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