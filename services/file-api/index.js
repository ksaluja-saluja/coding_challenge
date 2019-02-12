const FileService = require('./FileService');

let instance;

if (!instance) {
  instance = new FileService();
}

module.exports = instance